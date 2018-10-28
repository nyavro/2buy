package com.nyavro.tobuy

import com.nyavro.tobuy.SampleDataGenerator.createOrders
import com.nyavro.tobuy.group.GroupServiceImpl
import com.nyavro.tobuy.order.{OrderService, OrderServiceImpl}
import com.nyavro.tobuy.product.ProductServiceImpl
import com.nyavro.tobuy.services.security.HashService
import com.nyavro.tobuy.user.UserServiceImpl
import com.nyavro.tobuy.util.UtilServiceImpl
import com.typesafe.scalalogging.LazyLogging
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.{Failure, Random, Success}

class SampleDataGenerator

object SampleDataGenerator extends LazyLogging {

  def toHexString(bytes: Array[Byte]): String =
    bytes
      .map(_.toInt)
      .flatMap(item => Array((item & 0xF0) >> 4, item & 0xF))
      .map(_.toHexString.toUpperCase)
      .mkString

  def fromHexString(str: String): Array[Byte] =
    str
      .map(ch => Character.digit(ch, 16))
      .grouped(2)
      .map(item => (((item.head << 4) + item.tail.head) & 0xFF).toByte)
      .toArray

  def log[A](msg: String)(v: A): A = {
    logger.debug(msg + v)
    v
  }

  val random = new Random()

  def createOrders(ordersService: OrderService, products: Set[Long], initiatorUserId: Long, groupId: Long): Future[Set[Long]] =
    Future.sequence(
      products.map(p => ordersService.create(p, 1 + random.nextInt(3), initiatorUserId, groupId, None))
    )

  def main(args: Array[String]): Unit = {
    val db = Database.forConfig("2buy")
    try {
      val utilService = new UtilServiceImpl(db)
      val userService = new UserServiceImpl(db, new HashService())
      val groupService = new GroupServiceImpl(db)
      val productService = new ProductServiceImpl(db)
      val orderService = new OrderServiceImpl(db)
      val total = for {
        r <- utilService.clean(List("Order_History", "Order", "Product", "User_Group", "Group", "User")).map(log(""))
        //----User----
        u1 <- userService.create("U1", "123456", "Spider-man").map(log("users created:"))
        u2 <- userService.create("U2", "123456", "Wolverine").map(log("users created:"))
        u3 <- userService.create("U3", "123456", "Thor").map(log("users created:"))
        u4 <- userService.create("U4", "123456", "Hulk").map(log("users created:"))
        u5 <- userService.create("U5", "123456", "Joker").map(log("users created:"))
        u6 <- userService.create("U6", "123456", "Batman").map(log("users created:"))
        u7 <- userService.create("U7", "123456", "Superman").map(log("users created:"))
        u8 <- userService.create("U8", "123456", "Magneto").map(log("users created:"))
        u9 <- userService.create("U9", "123456", "Storm").map(log("users created:"))
        //----Group----
        g1 <- groupService.create("Marvel", u1).map(log("group created:"))
        g2 <- groupService.create("X-Men", u2).map(log("group created:"))
        g3 <- groupService.create("Avengers", u3).map(log("group created:"))
        g4 <- groupService.create("DC", u5).map(log("group created:"))
        //----User-Group----
//        _ <- groupService.join(g1, u1).map(log("User joined group:"))
        _ <- groupService.join(g1, u2).map(log("User joined group:"))
        _ <- groupService.join(g1, u3).map(log("User joined group:"))
        _ <- groupService.join(g1, u4).map(log("User joined group:"))
        _ <- groupService.join(g1, u8).map(log("User joined group:"))
        _ <- groupService.join(g1, u9).map(log("User joined group:"))
//        _ <- groupService.join(g2, u2).map(log("User joined group:"))
        _ <- groupService.join(g2, u4).map(log("User joined group:"))
        _ <- groupService.join(g2, u8).map(log("User joined group:"))
        _ <- groupService.join(g2, u9).map(log("User joined group:"))
        _ <- groupService.join(g3, u2).map(log("User joined group:"))
//        _ <- groupService.join(g3, u3).map(log("User joined group:"))
//        _ <- groupService.join(g4, u5).map(log("User joined group:"))
        _ <- groupService.join(g4, u6).map(log("User joined group:"))
        _ <- groupService.join(g4, u7).map(log("User joined group:"))
        //----Product----
        p1 <- productService.add("Leche").map(log("new product:"))
        p2 <- productService.add("Azucar").map(log("new product:"))
        p3 <- productService.add("TP").map(log("new product:"))
        p4 <- productService.add("Mantequilla").map(log("new product:"))
        p5 <- productService.add("Aceite").map(log("new product:"))
        p6 <- productService.add("Manzana").map(log("new product:"))
        p7 <- productService.add("Agua").map(log("new product:"))
        p8 <- productService.add("Queso").map(log("new product:"))
        p9 <- productService.add("Café").map(log("new product:"))
        p10 <- productService.add("Patata").map(log("new product:"))
        p11 <- productService.add("Tomate").map(log("new product:"))
        p12 <- productService.add("Pan").map(log("new product:"))
        p13 <- productService.add("Pasta").map(log("new product:"))
        p14 <- productService.add("Pescado").map(log("new product:"))
        p15 <- productService.add("Carne").map(log("new product:"))
        p16 <- productService.add("Pollo").map(log("new product:"))
        p17 <- productService.add("Ajo").map(log("new product:"))
        p18 <- productService.add("Cebolla").map(log("new product:"))
        p19 <- productService.add("Huevo").map(log("new product:"))
        p20 <- productService.add("Helado").map(log("new product:"))
        //----Order----
        _ <- createOrders(orderService, Set(p2, p3, p5), u1, g1).map(log("create order:"))
        _ <- createOrders(orderService, Set(p11, p13), u2, g1).map(log("create order:"))
        _ <- createOrders(orderService, Set(p17, p19), u3, g1).map(log("create order:"))
        _ <- createOrders(orderService, Set(p7), u4, g1).map(log("create order:"))
        _ <- createOrders(orderService, Set(p2, p4), u2, g2).map(log("create order:"))
        _ <- createOrders(orderService, Set(p8), u8, g2).map(log("create order:"))
        _ <- createOrders(orderService, Set(p16), u9, g2).map(log("create order:"))
        _ <- createOrders(orderService, Set(p1, p2, p3, p5), u2, g3).map(log("create order:"))
        _ <- createOrders(orderService, Set(p8, p13), u3, g3).map(log("create order:"))
        _ <- createOrders(orderService, Set(p6, p9), u5, g4).map(log("create order:"))
        _ <- createOrders(orderService, Set(p10, p12, p14), u6, g4).map(log("create order:"))
        _ <- createOrders(orderService, Set(p15, p18, p20), u7, g4).map(log("create order:"))
      } yield ()
      total.onComplete {
        case Success(v) => println("Succeeded: " + v)
        case Failure(cause) => println("Failed: " + cause)
      }
      Thread.sleep(20000)
    } finally db.close()
  }
}
