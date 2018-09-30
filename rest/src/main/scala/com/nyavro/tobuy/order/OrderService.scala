package com.nyavro.tobuy.order

import com.nyavro.tobuy.gen.Tables._
import slick.jdbc.PostgresProfile.api._
import com.nyavro.tobuy._

import scala.concurrent.{ExecutionContext, Future}

case class OrderResponse(product: String, count: Int, orderId: Long, state: String, comment: Option[String])

trait OrderService {
  def modify(orderId: Long, initiatorUserId: Long, count: Int, comment: Option[String], version: Int): Future[Option[Int]]
  def create(productIds: Set[Long], initiatorUserId: Long, groupId: Long, comment: Option[String]): Future[Option[Int]]
  def reject(orderId: Long, productId: Long, initiatorUserId: Long, comment: Option[String], version: Int): Future[Option[Int]]
  def list(groupId: Long): Future[Seq[models.Order]]
}

class OrderServiceImpl(db: Database)(implicit ec: ExecutionContext) extends OrderService {

  override def modify(orderId: Long, initiatorUserId: Long, count: Int, comment: Option[String], version: Int): Future[Option[Int]] =
    db.run(
      {
        val q = for {order <- Order if order.id === orderId && order.version === version} yield order.count
        val q2 = OrderHistory.map(history => (history.orderId, history.changedBy, history.status, history.comment)) +=
          (orderId, initiatorUserId, if (count==0) "CLOSED" else "OPENED", comment)
        (for {
          up <- q.update(count)
          if up > 0
          ins <- q2
        } yield if (up> 0) Some(up) else None).transactionally
      }
    )

  override def create(productIds: Set[Long], initiatorUserId: Long, groupId: Long, comment: Option[String]): Future[Option[Int]] =
    db.run(
      for {
        op <- UserGroup.filter(userGroup => userGroup.userId===initiatorUserId && userGroup.groupId===groupId).result.headOption
        if op.isDefined
        res <- Order.map(order => (order.productId, order.createdByUserId, order.groupId, order.comment)) ++=
          productIds.map(productId => (productId, initiatorUserId, groupId, comment))
      } yield res
    )

  override def reject(orderId: Long, productId: Long, initiatorUserId: Long, comment: Option[String], version: Int): Future[Option[Int]] =
    db.run {
      val q1 = Order.filter(order => order.id===orderId && order.version === version).result.headOption
      val q2 = OrderHistory.map(history => (history.orderId, history.changedBy, history.status, history.comment)) +=
        (orderId, initiatorUserId, "REJECTED", comment)
      (for {
        items <- q1
        if items.isDefined
        ins <- q2
      } yield if (ins>0) Some(ins) else None).transactionally
    }

  override def list(groupId: Long): Future[Seq[models.Order]] =
    db.run {
      Order.filter(_.groupId === groupId)
        .join(Product).on(_.productId===_.id)
        .joinLeft(OrderHistory).on {case ((order, _), history) => order.id === history.orderId}
        .map {case ((order, product), history) => (order, product, history.map(_.status))}
        .result
    }.map {
      _.map {
        case (order, product, status) =>
          models.Order(
            order.id,
            models.Product(product.id, product.name),
            order.count,
            order.comment,
            status.fold(models.OrderStatus.OPENED)(models.OrderStatus.withName)
          )
      }
    }
}
