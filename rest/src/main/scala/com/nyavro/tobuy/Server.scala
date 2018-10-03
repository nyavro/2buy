package com.nyavro.tobuy
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import com.nyavro.tobuy.services.{AuthService, CustomDirectives}
import com.nyavro.tobuy.services.security.{Base64Wrapper, HashService, TokenServiceImpl}
import com.typesafe.config.ConfigFactory
import slick.jdbc.PostgresProfile.api._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport

import scala.concurrent.ExecutionContext.Implicits.global
import slick.driver.PostgresDriver
import spray.json._
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model.headers.Allow
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.{MethodRejection, RejectionHandler}
import com.nyavro.tobuy.product.{ProductRoute, ProductServiceImpl}
import spray.json.BasicFormats

import scala.io.StdIn

object Server extends SprayJsonSupport with BasicFormats with DefaultJsonProtocol {
  private case class  LoginRequest(login: String, password: String)

  def main(args: Array[String]) {

    implicit val system = ActorSystem("2buy-system")
    implicit val materializer = ActorMaterializer()
    // needed for the future flatMap/onComplete in the end
    implicit val executionContext = system.dispatcher
    implicit val loginPasswordFormat = jsonFormat2(LoginRequest)

    implicit def rejectionHandler = RejectionHandler.newBuilder()
      .handleAll[MethodRejection] { rejections =>
      val methods = rejections map (_.supported)
      lazy val names = methods map (_.name) mkString ", "

      respondWithHeader(Allow(methods)) {
        options {
          complete(s"Supported methods : $names.")
        } ~
          complete(MethodNotAllowed,
            s"HTTP method not allowed, supported methods111: $names!")
      }
    }
      .result()

    val db = Database.forConfig("2buy")
    val authService = new AuthService(db, new HashService())
    val tokenService = new TokenServiceImpl(new Base64Wrapper("secret"))
    val productService = new ProductServiceImpl(db)
    val directives = new CustomDirectives()
    try {
      val routes =
        new ProductRoute(productService, directives).route ~
        path("auth") {
          path("create") {
            post {
              entity(as[LoginRequest]) { loginRequest =>
                complete(authService.register(loginRequest.login, loginRequest.password).map(_ => "OK"))
              }
            }
          } ~
          post {
            entity(as[LoginRequest]) { loginRequest =>
              complete(
                authService
                  .authenticate(loginRequest.login, loginRequest.password)
                  .map(
                    userOp =>
                      userOp.fold("Invalid"){user => tokenService.createToken(user)}
                  )
              )
            }
          }
        }

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
