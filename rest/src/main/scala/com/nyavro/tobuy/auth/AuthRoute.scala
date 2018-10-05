package com.nyavro.tobuy.auth

import akka.actor.ActorSystem
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.Directives.{complete, path, post, _}
import akka.http.scaladsl.server.Route
import akka.stream.ActorMaterializer
import com.nyavro.tobuy.services.RouteProvider
import com.nyavro.tobuy.services.security.{TokenService, TokenUser}
import com.nyavro.tobuy.user.UserService
import spray.json.DefaultJsonProtocol

import scala.concurrent.ExecutionContext

class AuthRoute(service: UserService, tokenService: TokenService)(
  implicit val system: ActorSystem,
  implicit val executor: ExecutionContext,
  implicit val materializer: ActorMaterializer
) extends RouteProvider with SprayJsonSupport with DefaultJsonProtocol {

  private case class Credentials(login: String, password: String)
  private case class Create(login: String, password: String, name: String)
  private case class UserResponse(token: String, name: String)

  private implicit val createformat = jsonFormat3(Create)
  private implicit val responseformat = jsonFormat2(UserResponse)
  private implicit val format = jsonFormat2(Credentials)

  override def route: Route = pathPrefix("auth") {
    path("create") {
      post {
        entity(as[Create]) { create =>
          complete(service.create(create.login, create.password, create.name).map(_ => "OK"))
        }
      }
    } ~
    post {
      entity(as[Credentials]) { credentials =>
        complete(
          service
            .find(credentials.login, credentials.password)
            .map (_.map {case (id, name) => UserResponse(tokenService.createToken(TokenUser(id)), name)})
        )
      }
    }
  }
}
