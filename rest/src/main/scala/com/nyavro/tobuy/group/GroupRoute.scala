package com.nyavro.tobuy.group

import akka.actor.ActorSystem
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import akka.stream.ActorMaterializer
import com.nyavro.tobuy.auth.AuthDirectives
import com.nyavro.tobuy.models.{GroupView, PaginatedItems, Pagination}
import com.nyavro.tobuy.services.RouteProvider
import com.nyavro.tobuy.util.CustomFormats
import spray.json.DefaultJsonProtocol

import scala.concurrent.ExecutionContext

class GroupRoute(service: GroupService, directives: AuthDirectives)(
  implicit val system: ActorSystem,
  implicit val executor: ExecutionContext,
  implicit val materializer: ActorMaterializer
) extends RouteProvider with SprayJsonSupport with DefaultJsonProtocol with Directives with CustomFormats {

  case class GroupCreate(name: String)
  case class GroupRequest(id: Long)

  implicit val createFormat = jsonFormat1(GroupCreate)
  implicit val joinFormat = jsonFormat1(GroupRequest)
  implicit val groupViewFormat = jsonFormat3(GroupView)
  implicit val paginationFormat = jsonFormat3(Pagination)
  implicit val paginatedItemsFormat = jsonFormat2(PaginatedItems[GroupView])

  override def route: Route = directives.authenticate { loggedUser =>
    pathPrefix("group") {
      path("view") {
        post {
          entity(as[Pagination]) { pagination =>
            complete(
              service.userGroups(loggedUser.id, pagination)
            )
          }
        }
      } ~
        path("create") {
          post {
            entity(as[GroupCreate]) { groupCreate =>
              complete(
                service.create(groupCreate.name, loggedUser.id).map(_.toString)
              )
            }
          }
        } ~
        path("join") {
          post {
            entity(as[GroupRequest]) { groupJoin =>
              complete(
                service.join(groupJoin.id, loggedUser.id).map(_.toString)
              )
            }
          }
        } ~
        path("leave") {
          post {
            entity(as[GroupRequest]) { groupJoin =>
              complete(
                service.leave(groupJoin.id, loggedUser.id).map(_.toString)
              )
            }
          }
        } ~
        path("delete") {
          post {
            entity(as[GroupRequest]) { groupJoin =>
              complete(
                service.delete(groupJoin.id, loggedUser.id).map(_.toString)
              )
            }
          }
        } ~
        path("members") {
          post {
            entity(as[GroupRequest]) { groupJoin =>
              complete(
                service.groupMembers(groupJoin.id, loggedUser.id)
              )
            }
          }
        }
    }
  }
}
