package com.nyavro.tobuy.order

import scala.concurrent.Future

trait OrderService {
  def modify(orderId: Long, productId: Long, initiatorUserId: Long, count: Int, comment: String): Future[Boolean]
  def create(productIds: List[Long], initiatorUserId: Long, comment: String): Future[Long]
  def reject(orderId: Long, productId: Long, initiatorUserId: Long, comment: String): Future[Boolean]
  def close(orderId: Long, productId: Long, initiatorUserId: Long): Future[Boolean]
}

class OrderServiceImpl extends OrderService {

  override def add(orderId: Long, productId: Long, initiatorUserId: Long, count: Int, comment: String) = {
    
  }

  override def modify(orderId: Long, productId: Long, initiatorUserId: Long, count: Int, comment: String): Unit = ???

  override def create(productIds: List[Long], initiatorUserId: Long, comment: String): Unit = ???

  override def reject(orderId: Long, productId: Long, initiatorUserId: Long, comment: String): Unit = ???

  override def close(orderId: Long, productId: Long, initiatorUserId: Long): Unit = ???
}
