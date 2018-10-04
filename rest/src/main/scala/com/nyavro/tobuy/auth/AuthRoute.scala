package com.nyavro.tobuy.auth

import akka.actor.ActorSystem
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.Directives.{complete, path, post, _}
import akka.http.scaladsl.server.Route
import akka.stream.ActorMaterializer
import com.nyavro.tobuy.services.RouteProvider
import com.nyavro.tobuy.services.security.TokenService
import spray.json.DefaultJsonProtocol
import scala.concurrent.ExecutionContext

class AuthRoute(service: AuthService, tokenService: TokenService)(
  implicit val system: ActorSystem,
  implicit val executor: ExecutionContext,
  implicit val materializer: ActorMaterializer
) extends RouteProvider with SprayJsonSupport with DefaultJsonProtocol {

  private case class  Credentials(login: String, password: String)
  private implicit val format = jsonFormat2(Credentials)

  override def route: Route = pathPrefix("auth") {
    path("create") {
      post {
        entity(as[Credentials]) { credentials =>
          complete(service.register(credentials.login, credentials.password).map(_ => "OK"))
        }
      }
    } ~
    post {
      entity(as[Credentials]) { credentials =>
        complete(
          service
            .authenticate(credentials.login, credentials.password)
            .map(
              userOp =>
                userOp.fold("Invalid"){user => tokenService.createToken(user)}
            )
        )
      }
    }
  }
}
