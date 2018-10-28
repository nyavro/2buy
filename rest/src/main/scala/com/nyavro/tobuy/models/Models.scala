package com.nyavro.tobuy.models

import java.util.Date

object OrderStatus extends Enumeration {
  val OPENED: Value = Value("OPENED")
  val REJECTED: Value = Value("REJECTED")
  val CLOSED: Value = Value("CLOSED")
}

case class User(id: Long, name: String)
case class Group(id: Long, name: String)
case class Product(id: Long, name: String)
case class Order(
  id: Long,
  product: Product,
  count: Int,
  comment: Option[String],
  status: OrderStatus.Value,
  version: Int,
  createdBy: User,
  createdAt: Date,
  lastModifiedBy: User,
  lastModifiedAt: Date
)

case class GroupView(id: Long, name: String, lastActivity: Date)

case class Pagination(offset: Option[Int] = None, count: Option[Int] = None, hasNextPage: Option[Boolean] = None) {
  def DefaultOffset = 0
  def DefaultCount = 100

  def offsetValue: Int = offset.getOrElse(DefaultOffset)
  def countValue: Int = count.getOrElse(DefaultCount)
}

case class PaginatedItems[T](pagination: Pagination, items: Seq[T])

object PaginatedItems {
  def toPage[T](items: Seq[T], pagination: Pagination): PaginatedItems[T] = {
    val res = items.take(pagination.countValue)
    PaginatedItems(Pagination(Some(pagination.offsetValue), Some(res.size), Some(items.size > pagination.countValue)), res)
  }
}

