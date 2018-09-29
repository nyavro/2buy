package com.nyavro.tobuy.order

import com.nyavro.tobuy.services.security.{Base64Encoded, TokenUser}
import com.nyavro.tobuy.gen.Tables._

import scala.concurrent.{ExecutionContext, Future}

import com.nyavro.tobuy.services.security.{Base64Encoded, HashService, TokenUser}
import com.nyavro.tobuy.gen.Tables._
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Random

trait OrderService {
  def modify(orderId: Long, initiatorUserId: Long, count: Int, comment: Option[String], version: Int): Future[Option[Int]]
  def create(productIds: List[Long], initiatorUserId: Long, groupId: Long, comment: Option[String]): Future[Option[Int]]
  def reject(orderId: Long, productId: Long, initiatorUserId: Long, comment: Option[String], version: Int): Future[Option[Int]]
}

class OrderServiceImpl(db: Database)(implicit ec: ExecutionContext) extends OrderService {

  override def modify(orderId: Long, initiatorUserId: Long, count: Int, comment: Option[String], version: Int): Future[Option[Int]] =
    db.run(
      {
        val q = for {order <- Order if order.id === orderId && order.version === version} yield order.count
        val q2 = OrderHistory.map(history => (history.orderId, history.changedBy, history.status, history.comment)) +=
          (orderId, initiatorUserId, if (count==0) "CLOSED" else "MODIFIED", comment)
        (for {
          up <- q.update(count)
          if up > 0
          ins <- q2
        } yield if (up> 0) Some(up) else None).transactionally
      }
    )

  override def create(productIds: List[Long], initiatorUserId: Long, groupId: Long, comment: Option[String]): Future[Option[Int]] =
    db.run(
      Order.map(order => (order.productId, order.createdByUserId, order.groupId, order.comment)) ++=
        productIds.map(productId => (productId, initiatorUserId, groupId, comment))
    )

  override def reject(orderId: Long, productId: Long, initiatorUserId: Long, comment: Option[String], version: Int): Future[Option[Int]] =
    db.run(
      {
        val q1 = Order.filter(order => order.id===orderId && order.version === version).result.headOption
        val q2 = OrderHistory.map(history => (history.orderId, history.changedBy, history.status, history.comment)) +=
          (orderId, initiatorUserId, "REJECTED", comment)
        (for {
          items <- q1
          if items.isDefined
          ins <- q2
        } yield if (ins>0) Some(ins) else None).transactionally
      }
    )
}
