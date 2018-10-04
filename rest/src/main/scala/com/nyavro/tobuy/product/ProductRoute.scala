package com.nyavro.tobuy.product

import akka.actor.ActorSystem
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.Directives.{complete, path, pathEndOrSingleSlash, post, _}
import akka.http.scaladsl.server.Route
import akka.stream.ActorMaterializer
import com.nyavro.tobuy.auth.AuthDirectives
import com.nyavro.tobuy.services.RouteProvider
import spray.json.DefaultJsonProtocol

import scala.concurrent.ExecutionContext

case class ProductCreate(name: String)

class ProductRoute(service: ProductService, directives: AuthDirectives)(
  implicit val system: ActorSystem,
  implicit val executor: ExecutionContext,
  implicit val materializer: ActorMaterializer
) extends RouteProvider with SprayJsonSupport with DefaultJsonProtocol {
  implicit val format = jsonFormat1(ProductCreate)

  override def route: Route = pathPrefix("product") {
    path("view") {
      post {
        complete(service.list())
      }
    } ~
    pathEndOrSingleSlash {
      post {
        entity(as[ProductCreate]) {
          case ProductCreate(name) => complete(service.add(name).map(_.toString))
        }
      }
    }
  }
}
