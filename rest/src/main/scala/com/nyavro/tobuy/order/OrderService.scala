package com.nyavro.tobuy.order

import java.sql.Timestamp

import com.nyavro.tobuy.gen.Tables._
import slick.jdbc.PostgresProfile.api._
import com.nyavro.tobuy._
import com.nyavro.tobuy.models.{PaginatedItems, Pagination}

import scala.concurrent.{ExecutionContext, Future}

case class OrderResponse(product: String, count: Int, orderId: Long, state: String, comment: Option[String])

trait OrderService {
  def modify(orderId: Long, groupId: Long, initiatorUserId: Long, count: Int, comment: Option[String], version: Int): Future[Int]
  def create(productIds: Set[Long], initiatorUserId: Long, groupId: Long, comment: Option[String]): Future[Int]
  def reject(orderId: Long, groupId: Long, initiatorUserId: Long, comment: Option[String], version: Int): Future[Int]
  def list(groupId: Long, userId: Long, pagination: Pagination = Pagination()): Future[PaginatedItems[models.Order]]
}

class OrderServiceImpl(db: Database)(implicit ec: ExecutionContext) extends OrderService {

  override def modify(orderId: Long, groupId: Long, initiatorUserId: Long, count: Int, comment: Option[String], version: Int): Future[Int] =
    db.run(
      (for {
        up <- Order
          .filter(order => order.id === orderId && order.version === version && order.groupId === groupId)
          .map(order => (order.count, order.version))
          .update(count, version+1)
        if up > 0
        _ <- Group
          .filter(_.id === groupId)
          .map(_.lastActivity)
          .update(new Timestamp(System.currentTimeMillis()))
        ins <- OrderHistory.map(history => (history.orderId, history.changedBy, history.status, history.comment)) +=
          (orderId, initiatorUserId, if (count==0) "CLOSED" else "OPENED", comment)
      } yield ins).transactionally
    )

  override def create(productIds: Set[Long], initiatorUserId: Long, groupId: Long, comment: Option[String]): Future[Int] =
    db.run(
      (for {
        op <- UserGroup.filter(userGroup => userGroup.userId===initiatorUserId && userGroup.groupId===groupId).result.headOption
        if op.isDefined
        _ <- Group.filter(_.id === groupId).map(_.lastActivity).update(new Timestamp(System.currentTimeMillis()))
        res <- Order.map(order => (order.productId, order.createdByUserId, order.groupId, order.comment)) ++=
          productIds.map(productId => (productId, initiatorUserId, groupId, comment))
      } yield res.getOrElse(0)).transactionally
    )

  override def reject(orderId: Long, groupId: Long, initiatorUserId: Long, comment: Option[String], version: Int): Future[Int] =
    db.run(
      (for {
        items <- Order
          .filter(order => order.id===orderId && order.version === version && order.groupId === groupId)
          .map(_.version)
          .update(version+1)
        if items>0
        _ <- Group
          .filter(_.id === groupId)
          .map(_.lastActivity)
          .update(new Timestamp(System.currentTimeMillis()))
        ins <- OrderHistory.map(history => (history.orderId, history.changedBy, history.status, history.comment)) +=
          (orderId, initiatorUserId, "REJECTED", comment)
      } yield ins).transactionally
    )

  override def list(groupId: Long, userId: Long, pagination: Pagination = Pagination()): Future[PaginatedItems[models.Order]] =
    db.run {
      UserGroup
        .filter(ug => ug.groupId === groupId && ug.userId === userId)
        .join(Order).on(_.groupId === _.groupId)
        .drop(pagination.offsetValue)
        .take(pagination.countValue + 1)
        .join(Product).on(_._2.productId === _.id)
        .joinLeft(OrderHistory).on {case (((_, order), _), history) => order.id === history.orderId}
        .map {case (((_,order), product), history) => (order, product, history.map(item => (item.status, item.comment)))}
        .result
    }.map (items =>
      PaginatedItems.toPage(
        items.map {
          case (order, product, history) =>
            models.Order(
              order.id,
              models.Product(product.id, product.name),
              order.count,
              history.fold(order.comment)(_._2),
              history.fold(models.OrderStatus.OPENED)(v => models.OrderStatus.withName(v._1)),
              order.version
            )
        },
        pagination
      )
    )
}
