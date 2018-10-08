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
case class Order(id: Long, product: Product, count: Int, comment: Option[String], status: OrderStatus.Value, version: Int)

case class GroupView(id: Long, name: String, lastActivity: Date)

case class Pagination(offset: Int = 0, count: Int = 100, hasNextPage: Boolean = false)
case class PaginatedItems[T](pagination: Pagination, items: Seq[T])

