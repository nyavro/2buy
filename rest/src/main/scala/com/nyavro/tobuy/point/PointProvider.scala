package com.nyavro.tobuy.point

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.Route
import com.nyavro.tobuy.services.RouteProvider
import akka.http.scaladsl.server.Directives.{complete, path, post, _}
import com.nyavro.tobuy.product.ProductService
import spray.json.{DefaultJsonProtocol, JsValue}

import scala.concurrent.ExecutionContext

class PointProvider(productService: ProductService)(implicit ctx:ExecutionContext) extends RouteProvider with SprayJsonSupport with DefaultJsonProtocol {
  override def route: Route =
    (post & path("point")) {
      entity(as[JsValue]){ requestJson =>
        new GraphQLServer(productService).endpoint(requestJson)
      }
    }
}
