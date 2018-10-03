package com.nyavro.tobuy

import com.nyavro.tobuy.group.GroupServiceImpl
import com.nyavro.tobuy.order.OrderServiceImpl
import com.nyavro.tobuy.product.ProductServiceImpl
import com.nyavro.tobuy.services.security.HashService
import com.nyavro.tobuy.user.UserServiceImpl
import com.nyavro.tobuy.util.UtilServiceImpl
import com.typesafe.scalalogging.LazyLogging
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{Failure, Success}


class Test

object Test extends LazyLogging {

  def main(args: Array[String]): Unit = {

//    val logger = Logger[com.nyavro.tobuy.Test]
    logger.debug("com.nyavro.tobuy.Test")

    def log[A](msg: String)(v: A): A = {
      logger.debug(msg + v)
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
        r <- utilService.clean(List("Order_History", "Order", "Product", "User_Group", "Group", "User")).map(log(""))
        //----User-create---
        u1 <- userService.create("user1", "heyEny").map(log("users created:"))
        u2 <- userService.create("user2", "heyEny").map(log("users created:"))
        //----User-find---
        user1Id <- userService.find("user1", "heyEny").map(log("users found:"))
        user2Id <- userService.find("user2", "heyEny").map(log("users found:"))
        if user1Id.isDefined && user2Id.isDefined
        //----Group-create---
        group1Id <- groupService.create("group1", user1Id.get).map(log("group created:"))
        group2Id <- groupService.create("group2", user2Id.get).map(log("group created:"))
        group3Id <- groupService.create("group3", user1Id.get).map(log("group created:"))
        groups1 <- groupService.userGroups(user1Id.get).map(log("groups found:"))
        //----Group-userGroups---
        groups2 <- groupService.userGroups(user2Id.get).map(log("groups found:"))
        v = groups1
        if groups1.nonEmpty
        //----Group-rename---
        renamed <- groupService.rename(group1Id, "group1renamed", user1Id.get).map(log("group renamed:"))
        notRenamed <- groupService.rename(group1Id, "group1renamedByUser2", user2Id.get).map(log("group renamed:"))
        //----Group-join---
        user2joinsGroup1 <- groupService.join(group1Id, user2Id.get).map(log("User joined group:"))
        joinJoinedGroup <- groupService.join(group1Id, user2Id.get).recover{case _ => "Already in group"}.map(log("User joined group:"))
        //----Group-leave---
        user2leavesGroup1 <- groupService.leave(group1Id, user2Id.get).map(log("User left group:"))
        user2joinsGroup1 <- groupService.join(group1Id, user2Id.get).map(log("User joined group:"))
        //----Group-delete---
        user2TryingToDeleteGroup1 <- groupService.delete(group3Id, user2Id.get).recover{case _ => "Unabled to delete group. Not own group"}.map(log("User removes group:"))
        user1TryingToDeleteGroup1 <- groupService.delete(group3Id, user1Id.get).map(log("User removes group:"))
        //----Product-add---
        product1 <- productService.add("product1").map(log("new product:"))
        product2 <- productService.add("product2").map(log("new product:"))
        product3 <- productService.add("product3").map(log("new product:"))
        //----Product-list---
        products <- productService.list().map(log("products:"))
        //----Order-create
        groupUserCreatesOrder <- orderService.create(Set(product1, product2), user2Id.get, group1Id, None).map(log("create order:"))
        nonGroupUserFailsToCreateOrder <- orderService.create(Set(product2, product3), user1Id.get, group2Id, None).recover{case _ => "Cannot create order in group"}.map(log("create order:"))
        //----Order-list
        list1 <- orderService.list(group1Id).map(log("group orders:"))
        if list1.nonEmpty
        order0Id = list1.head.id
        order1Id = list1.drop(1).head.id
        //----Order-modify
        _ <- orderService.modify(order0Id, user1Id.get, 0, Some("Done"), 0).map(log("modified: ")).map(log("modify:"))
        _ <- orderService.modify(order0Id, user2Id.get, 2, Some("More"), 0).map(log("modified: ")).recover{case _ => "Cannot modify - optimistic lock"}.map(log(""))
        //----Order-reject
        v = log("ids: ")(order0Id + " " + order1Id)
        _ <- orderService.reject(order1Id, user1Id.get, Some("Won't"), 0).map(log("modified: ")).recover{case e => "Cannot reject - optimistic lock" + e.toString}.map(log(""))
        list1m <- orderService.list(group1Id).map(log("group orders:"))
      } yield v
      total.onComplete {
        case Success(v) => println("Succeeded: " + v)
        case Failure(cause) => println("Failed: " + cause)
      }
      Thread.sleep(20000)
    } finally db.close()
  }
}
