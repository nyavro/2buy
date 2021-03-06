package com.nyavro.tobuy
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model.headers.Allow
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.{MethodRejection, RejectionHandler}
import akka.stream.ActorMaterializer
import com.nyavro.tobuy.auth.{AuthDirectives, AuthRoute}
import com.nyavro.tobuy.group.{GroupRoute, GroupServiceImpl}
import com.nyavro.tobuy.notification.NotificationServiceImpl
import com.nyavro.tobuy.order.{OrderRoute, OrderServiceImpl}
import com.nyavro.tobuy.point.PointProvider
import com.nyavro.tobuy.product.{ProductRoute, ProductServiceImpl}
import com.nyavro.tobuy.services.security.{Base64Wrapper, Cors, HashService, TokenServiceImpl}
import com.nyavro.tobuy.user.UserServiceImpl
import slick.jdbc.PostgresProfile.api._
import spray.json.{BasicFormats, _}

import scala.io.StdIn

object Server extends SprayJsonSupport with BasicFormats with DefaultJsonProtocol with Cors {

  def main(args: Array[String]) {

    implicit val system = ActorSystem("2buy-system")
    implicit val materializer = ActorMaterializer()
    // needed for the future flatMap/onComplete in the end
    implicit val executionContext = system.dispatcher

    implicit def rejectionHandler = RejectionHandler.newBuilder()
      .handleAll[MethodRejection] { rejections =>
      val methods = rejections map (_.supported)
      lazy val names = methods map (_.name) mkString ", "

      respondWithHeader(Allow(methods)) {
        options {
          complete(s"Supported methods : $names.")
        } ~
          complete(MethodNotAllowed,
            s"HTTP method not allowed, supported methods : $names!")
      }
    }
      .result()

    val db = Database.forConfig("2buy")
    val userService = new UserServiceImpl(db, new HashService())
    val tokenService = new TokenServiceImpl(new Base64Wrapper("secret"))
    val productService = new ProductServiceImpl(db)
    val groupService = new GroupServiceImpl(db)
    val orderService = new OrderServiceImpl(db)
    val notificationService = new NotificationServiceImpl()
    val directives = new AuthDirectives(tokenService)
    try {
      val routes =
//        corsHandler (
//        new AuthRoute(userService, tokenService).route ~
//        new ProductRoute(productService, directives).route ~
//        new GroupRoute(groupService, notificationService, directives).route ~
//        new OrderRoute(orderService, notificationService, directives).route ~
        new PointProvider(productService).route ~
        getFromResource("graphql.html")
//      )
      val port = 8087
      val bindingFuture = Http().bindAndHandle(routes, "localhost", port)

      println(s"Server online at http://localhost:$port/\nPress RETURN to stop...")
      StdIn.readLine() // let it run until user presses return
      bindingFuture
        .flatMap(_.unbind()) // trigger unbinding from the port
        .onComplete(_ => system.terminate()) // and shutdown when done
    } finally db.close()
  }
}
