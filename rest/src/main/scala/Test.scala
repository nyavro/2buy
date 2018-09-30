import com.nyavro.tobuy.group.GroupServiceImpl
import com.nyavro.tobuy.order.OrderServiceImpl
import com.nyavro.tobuy.product.ProductServiceImpl
import com.nyavro.tobuy.services.security.HashService
import com.nyavro.tobuy.user.UserServiceImpl
import com.nyavro.tobuy.util.{UtilService, UtilServiceImpl}
import com.typesafe.config.ConfigFactory
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext.Implicits.global
import slick.driver.PostgresDriver

import scala.concurrent.Future
import scala.util.{Failure, Success}

object Test {

  def main(args: Array[String]): Unit = {

    def log[A](v: A): A = logM("")(v)

    def logM[A](msg: String)(v: A): A = {
      println(msg + v)
      v
    }

    val db = Database.forConfig("2buy")
    try {
      val utilService = new UtilServiceImpl(db)
      val userService = new UserServiceImpl(db, new HashService())
      val groupService = new GroupServiceImpl(db)
      val productService = new ProductServiceImpl(db)
      val orderService = new OrderServiceImpl(db)

      val total = for {
        r <- utilService.clean(List("Order_History", "Order", "Product", "User_Group", "Group", "User")).map(log)
        //----User-create---
        u1 <- userService.create("user1", "heyEny").map(logM("users created:"))
        u2 <- userService.create("user2", "heyEny").map(logM("users created:"))
        //----User-find---
        user1Id <- userService.find("user1", "heyEny").map(logM("users found:"))
        user2Id <- userService.find("user2", "heyEny").map(logM("users found:"))
        if user1Id.isDefined && user2Id.isDefined
        //----Group-create---
        group1Id <- groupService.create("group1", user1Id.get).map(logM("group created:"))
        group2Id <- groupService.create("group2", user2Id.get).map(logM("group created:"))
        group3Id <- groupService.create("group3", user1Id.get).map(logM("group created:"))
        groups1 <- groupService.userGroups(user1Id.get).map(logM("groups found:"))
        //----Group-userGroups---
        groups2 <- groupService.userGroups(user2Id.get).map(logM("groups found:"))
        v = groups1
        if groups1.nonEmpty
        //----Group-rename---
        renamed <- groupService.rename(group1Id, "group1renamed", user1Id.get).map(logM("group renamed:"))
        notRenamed <- groupService.rename(group1Id, "group1renamedByUser2", user2Id.get).map(logM("group renamed:"))
        //----Group-join---
        user2joinsGroup1 <- groupService.join(group1Id, user2Id.get).map(logM("User joined group:"))
        joinJoinedGroup <- groupService.join(group1Id, user2Id.get).recover{case _ => "Already in group"}.map(logM("User joined group:"))
        //----Group-delete---
        user2TryingToDeleteGroup1 <- groupService.delete(group3Id, user2Id.get).recover{case _ => "Unabled to delete group. Not own group"}.map(logM("User removes group:"))
        user1TryingToDeleteGroup1 <- groupService.delete(group3Id, user1Id.get).map(logM("User removes group:"))
        //----Product-add---
        product1 <- productService.add("product1").map(logM("new product:"))
        product2 <- productService.add("product2").map(logM("new product:"))
        product3 <- productService.add("product3").map(logM("new product:"))
        //----Product-list---
        products <- productService.list().map(logM("products:"))
        //----Order-create
        groupUserCreatesOrder <- orderService.create(Set(product1, product2), user2Id.get, group1Id, None).map(logM("create order:"))
        nonGroupUserFailsToCreateOrder <- orderService.create(Set(product2, product3), user1Id.get, group2Id, None).recover{case _ => "Cannot create order in group"}.map(logM("create order:"))
        //----Order-list
        list1 <- orderService.list(group1Id).map(logM("group orders:"))
      } yield v
      total.onComplete {
        case Success(v) => println("Succeeded: " + v)
        case Failure(cause) => println("Failed: " + cause)
      }
      Thread.sleep(20000)
    } finally db.close()
  }
}
