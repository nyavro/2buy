package com.nyavro.tobuy.order

import akka.actor.ActorSystem
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.{Directives, Route}
import akka.stream.ActorMaterializer
import com.nyavro.tobuy.auth.AuthDirectives
import com.nyavro.tobuy.models._
import com.nyavro.tobuy.notification.NotificationService
import com.nyavro.tobuy.services.RouteProvider
import com.nyavro.tobuy.util.CustomFormats

import scala.concurrent.ExecutionContext
import scala.util.Success

class OrderRoute(service: OrderService, notificationService: NotificationService, directives: AuthDirectives)(
  implicit val system: ActorSystem,
  implicit val executor: ExecutionContext,
  implicit val materializer: ActorMaterializer
) extends RouteProvider with CustomFormats with Directives {

  case class OrdersRequest(groupId: Long, pagination: Pagination)
  case class ModifyRequest(orderId: Long, groupId: Long, count: Int, comment: Option[String], version: Int)
  case class CreateRequest(productIds: Set[Long], groupId: Long, comment: Option[String])
  case class RejectRequest(orderId: Long, groupId: Long, comment: Option[String], version: Int)

  implicit val ordersRequestFormat = jsonFormat2(OrdersRequest)
  implicit val modifyRequestFormat = jsonFormat5(ModifyRequest)
  implicit val createRequestFormat = jsonFormat3(CreateRequest)
  implicit val rejectRequestFormat = jsonFormat4(RejectRequest)

  override def route: Route = directives.authenticate { loggedUser =>
    pathPrefix("order") {
      path("view") {
        post {
          entity(as[OrdersRequest]) { case OrdersRequest(groupId, pagination) =>
            complete(
              service.list(groupId, loggedUser.id, pagination)
            )
          }
        }
      } ~
      path("modify") {
        put {
          entity(as[ModifyRequest]) { case ModifyRequest(orderId, groupId, count, comment, version) =>
            onComplete(service.modify(orderId, groupId, loggedUser.id, count, comment, version)) {
              case Success(updated) =>
                if (updated > 0) {
                  notificationService.groupOrderChange(groupId)
                  complete(StatusCodes.OK)
                } else
                  complete(StatusCodes.NotAcceptable)
            }
          }
        }
      } ~
      path("create") {
        post {
          entity(as[CreateRequest]) { case CreateRequest(productIds, groupId, comment) =>
            onComplete(service.create(productIds, loggedUser.id, groupId, comment)) {
              case Success(updated) =>
                if (updated>0) {
                  notificationService.groupOrderChange(groupId)
                  complete(StatusCodes.OK)
                } else
                  complete(StatusCodes.NotAcceptable)
            }
          }
        }
      } ~
      path("reject") {
        put {
          entity(as[RejectRequest]) { case RejectRequest(orderId, groupId, comment, version) =>
            onComplete(service.reject(orderId, groupId, loggedUser.id, comment, version)) {
              case Success(updated) =>
                if (updated>0) {
                  notificationService.groupOrderChange(groupId)
                  complete(StatusCodes.OK)
                } else
                  complete(StatusCodes.NotAcceptable)
            }
          }
        }
      }
    }
  }
}
