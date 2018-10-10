package com.nyavro.tobuy.group

import akka.actor.ActorSystem
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.{Directives, Route}
import akka.stream.ActorMaterializer
import com.nyavro.tobuy.auth.AuthDirectives
import com.nyavro.tobuy.models.Pagination
import com.nyavro.tobuy.notification.NotificationService
import com.nyavro.tobuy.services.RouteProvider
import com.nyavro.tobuy.util.CustomFormats

import scala.concurrent.ExecutionContext
import scala.util.Success

class GroupRoute(service: GroupService, notificationService: NotificationService, directives: AuthDirectives)(
  implicit val system: ActorSystem,
  implicit val executor: ExecutionContext,
  implicit val materializer: ActorMaterializer
) extends RouteProvider with Directives with CustomFormats {

  case class GroupCreate(name: String)
  case class GroupRequest(groupId: Long)

  implicit val createFormat = jsonFormat1(GroupCreate)
  implicit val joinFormat = jsonFormat1(GroupRequest)

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
          put {
            entity(as[GroupRequest]) { groupJoin =>
              onComplete(
                service.join(groupJoin.groupId, loggedUser.id)
              ) {
                case Success(updated) =>
                  if (updated > 0) {
                    notificationService.groupMemberChange(groupJoin.groupId)
                    complete(StatusCodes.OK)
                  } else {
                    complete(StatusCodes.BadRequest)
                  }
              }
            }
          }
        } ~
        path("leave") {
          post {
            entity(as[GroupRequest]) { groupJoin =>
              onComplete(
                service.leave(groupJoin.groupId, loggedUser.id)
              ) {
                case Success(updated) =>
                  if (updated > 0) {
                    notificationService.groupMemberChange(groupJoin.groupId)
                    complete(StatusCodes.OK)
                  } else {
                    complete(StatusCodes.BadRequest)
                  }
              }
            }
          }
        } ~
        path("delete") {
          post {
            entity(as[GroupRequest]) { groupJoin =>
              complete(
                service.delete(groupJoin.groupId, loggedUser.id).map(_.toString)
              )
            }
          }
        } ~
        path("members") {
          post {
            entity(as[GroupRequest]) { groupJoin =>
              complete(
                service.groupMembers(groupJoin.groupId, loggedUser.id)
              )
            }
          }
        }
    }
  }
}
