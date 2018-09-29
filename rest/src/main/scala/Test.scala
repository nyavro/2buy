import com.nyavro.tobuy.group.GroupServiceImpl
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

      val total = for {
        r <- utilService.clean(List("order_history", "Order", "Product", "user_group", "Group", "User")).map(log)
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
        groups1 <- groupService.userGroups(user1Id.get).map(logM("groups found:"))
        //----Group-userGroups---
        groups2 <- groupService.userGroups(user2Id.get).map(logM("groups found:"))
        v = groups1
        if groups1.nonEmpty
        group1Id = groups1.head._2
        //----Group-rename---
        renamed <- groupService.rename(group1Id, "group1renamed", user1Id.get).map(logM("group renamed:"))
        notRenamed <- groupService.rename(group1Id, "group1renamedByUser2", user2Id.get).map(logM("group renamed:"))
        //----Group-join---
        joinUser2Group1 <- groupService.join(group1Id, user2Id.get).map(logM("User joined group:"))
        joinJoinedGroup <- groupService.join(group1Id, user2Id.get).recover{case _ => "Already in group"}.map(logM("User joined group:"))
        //----Group-delete---
        user2TryingToDeleteGroup1 <- groupService.delete(group1Id, user2Id.get).recover{case _ => "Unabled to delete group. Not own group"}.map(logM("User removes group:"))
        user1TryingToDeleteGroup1 <- groupService.delete(group1Id, user1Id.get).map(logM("User removes group:"))
      } yield v
      total.onComplete {
        case Success(v) => println("Succeeded: " + v)
        case Failure(cause) => println("Failed: " + cause)
      }
      Thread.sleep(20000)
    } finally db.close()
  }
}
