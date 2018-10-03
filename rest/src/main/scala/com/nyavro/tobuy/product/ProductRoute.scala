package com.nyavro.tobuy.product

import akka.actor.ActorSystem
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.Directives.{complete, get, path, post, _}
import akka.http.scaladsl.server.Route
import akka.stream.ActorMaterializer
import com.nyavro.tobuy.models.Product
import com.nyavro.tobuy.services.{CustomDirectives, RouteProvider}
import spray.json.DefaultJsonProtocol

import scala.concurrent.ExecutionContext

class ProductRoute(service: ProductService, directives: CustomDirectives)(
  implicit val system: ActorSystem,
  implicit val executor: ExecutionContext,
  implicit val materializer: ActorMaterializer
) extends RouteProvider with SprayJsonSupport with DefaultJsonProtocol {
  implicit val format = jsonFormat2(Product)
//  override def route: Route = pathPrefix("product") {
//    path("create") {
//      pathEndOrSingleSlash {
//        directives.authenticate { loggedUser =>
//
//        }
//      }
//    }
//  }
  override def route: Route = path("product") {
    post {
      complete(HttpEntity(ContentTypes.`text/plain(UTF-8)` ,"Order saved"))
    } ~
    get {
      complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1>Say hello to akka-http</h1>"))
    }
  }
}
