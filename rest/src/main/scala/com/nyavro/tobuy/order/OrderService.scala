package com.nyavro.tobuy.order

import java.sql.Timestamp

import com.nyavro.tobuy._
import com.nyavro.tobuy.gen.Tables._
import com.nyavro.tobuy.models.{OrderStatus, PaginatedItems, Pagination}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.{ExecutionContext, Future}

case class OrderFilter(status: Option[String])

case class OrderResponse(product: String, count: Int, orderId: Long, state: String, comment: Option[String])

trait OrderService {
  def close(orderId: Long, groupId: Long, initiatorUserId: Long, comment: Option[String], version: Int): Future[Int]
  def modify(orderId: Long, groupId: Long, initiatorUserId: Long, count: Int, comment: Option[String], version: Int): Future[Int]
  def create(productId: Long, count: Int, initiatorUserId: Long, groupId: Long, comment: Option[String]): Future[Option[models.Order]]
  def reject(orderId: Long, groupId: Long, initiatorUserId: Long, comment: Option[String], version: Int): Future[Int]
  def list(groupId: Long, userId: Long, pagination: Pagination = Pagination(), filter: Option[OrderFilter] = None): Future[PaginatedItems[models.Order]]
}

class OrderServiceImpl(db: Database)(implicit ec: ExecutionContext) extends OrderService {

  override def create(productId: Long, count: Int, initiatorUserId: Long, groupId: Long, comment: Option[String]): Future[Option[models.Order]] = {
    val status = "OPENED"
    val ts = new Timestamp(System.currentTimeMillis())
    db.run(
      (for {
        op <- userInGroup(initiatorUserId, groupId)
        if op.isDefined
        orderId <- Order.returning(Order.map(_.id)) += OrderRow(0L, productId, initiatorUserId, groupId, count, ts, initiatorUserId, ts, status, comment)
        _ <- updateGroup(groupId, ts)
        _ <- updateHistory(orderId, initiatorUserId, count, comment, status)
        v <- getById(orderId).headOption
      } yield v)
        .transactionally
        .map (
          _.map {case ((o, p), u) =>
            models.Order(
              o.id,
              models.Product(p.id, p.name),
              o.count,
              o.comment,
              OrderStatus.withName(o.status),
              o.version,
              models.User(u.id, u.name),
              o.createdAt,
              models.User(u.id, u.name),
              o.modifiedAt
            )
          }
        )
    )
  }

  override def modify(orderId: Long, groupId: Long, initiatorUserId: Long, count: Int, comment: Option[String], version: Int): Future[Int] = {
    val status = if (count==0) "CLOSED" else "OPENED"
    val ts = new Timestamp(System.currentTimeMillis())
    db.run(
      (for {
        check <- userInGroup(initiatorUserId, groupId)
        if check.isDefined
        up <- updateOrder(orderId, groupId, initiatorUserId, count, comment, version, status, ts)
        if up > 0
        _ <- updateGroup(groupId, ts)
        _ <- updateHistory(orderId, initiatorUserId, count, comment, status)
      } yield up).transactionally
    )
  }

  override def reject(orderId: Long, groupId: Long, initiatorUserId: Long, comment: Option[String], version: Int): Future[Int] = {
    val status = "REJECTED"
    val ts = new Timestamp(System.currentTimeMillis())
    db.run(
      (for {
        check <- userInGroup(initiatorUserId, groupId)
        if check.isDefined
        up <- updateOrder(orderId, groupId, initiatorUserId, 0, comment, version, status, ts)
        if up > 0
        _ <- updateGroup(groupId, ts)
        _ <- updateHistory(orderId, initiatorUserId, 0, comment, status)
      } yield up).transactionally
    )
  }

  override def close(orderId: Long, groupId: Long, initiatorUserId: Long, comment: Option[String], version: Int): Future[Int] = {
    val status = "CLOSED"
    val ts = new Timestamp(System.currentTimeMillis())
    db.run(
      (for {
        check <- userInGroup(initiatorUserId, groupId)
        if check.isDefined
        up <- updateOrder(orderId, groupId, initiatorUserId, 0, comment, version, status, ts)
        if up > 0
        _ <- updateGroup(groupId, new Timestamp(System.currentTimeMillis()))
        _ <- updateHistory(orderId, initiatorUserId, 0, comment, status)
      } yield up).transactionally
    )
  }

  implicit class QueryOps[E, U](query: Query[E, U, Seq]) {
    def maybeFilter[T](filter: Option[T])(f: T => E => Rep[Boolean]) = filter.map(v => query.filter(f(v))).getOrElse(query)
  }

  private def getById(id: Long) = {
    Order
      .filter(_.id === id)
      .join(Product).on(_.productId === _.id)
      .join(User).on { case ((o, p), u) => o.createdByUserId === u.id }
      .result
  }

  override def list(groupId: Long, userId: Long, pagination: Pagination, filter: Option[OrderFilter]): Future[PaginatedItems[models.Order]] = {
    db.run {
      UserGroup
        .filter(ug => ug.groupId === groupId && ug.userId === userId)
        .join(Order).on(_.groupId === _.groupId)
        .join(User).on { case ((ug, o), uc) => o.createdByUserId === uc.id }
        .join(User).on { case (((ug, o), uc), um) => o.modifiedByUserId === um.id }
        .join(Product).on { case ((((ug, o), uc), um), p) => o.productId === p.id }
        .maybeFilter(filter.flatMap(_.status)) {
          status => {case ((((_, o), _), _), _) => o.status === status}
        }
        .drop(pagination.offsetValue)
        .take(pagination.countValue + 1)
        .map { case ((((_, o), uc), um), p) => (o, p, uc, um) }
        .sortBy(_._1.createdAt)
        .result
    }.map(items =>
      PaginatedItems.toPage(
        items.map {
          case (order, product, creator, modifier) =>
            models.Order(
              order.id,
              models.Product(product.id, product.name),
              order.count,
              order.comment,
              models.OrderStatus.withName(order.status),
              order.version,
              models.User(creator.id, creator.name),
              order.createdAt,
              models.User(modifier.id, modifier.name),
              order.modifiedAt
            )
        },
        pagination
      )
    )
  }

  private def userInGroup(userId: Long, groupId: Long) =
    UserGroup.filter(userGroup => userGroup.userId === userId && userGroup.groupId === groupId).result.headOption

  private def updateGroup(groupId: Long, ts: Timestamp) = {
    Group
      .filter(_.id === groupId)
      .map(_.lastActivity)
      .update(ts)
  }

  private def updateOrder(orderId: Long, groupId: Long, initiatorUserId: Long, count: Int, comment: Option[String], version: Int, status: String, ts: Timestamp) = {
    Order
      .filter(order => order.id === orderId && order.version === version && order.groupId === groupId)
      .map(order => (order.count, order.modifiedByUserId, order.modifiedAt, order.status, order.comment, order.version))
      .update(count, initiatorUserId, ts, status, comment, version + 1)
  }

  private def updateHistory(orderId: Long, initiatorUserId: Long, count: Int, comment: Option[String], status: String) = {
    OrderHistory.map(history => (history.orderId, history.changedBy, history.status, history.orderCount, history.comment)) +=
      (orderId, initiatorUserId, status, Some(count), comment)
  }
}
