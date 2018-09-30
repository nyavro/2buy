package com.nyavro.tobuy.models

object OrderStatus extends Enumeration {
  val OPENED: Value = Value("OPENED")
  val REJECTED: Value = Value("REJECTED")
  val CLOSED: Value = Value("CLOSED")
}

case class User(id: Long, name: String)
case class Group(id: Long, name: String)
case class Product(id: Long, name: String)
case class Order(id: Long, product: Product, count: Int, comment: Option[String], status: OrderStatus.Value)

