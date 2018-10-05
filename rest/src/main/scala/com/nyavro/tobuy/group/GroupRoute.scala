package com.nyavro.tobuy.group

import akka.actor.ActorSystem
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.Directives.{complete, path, pathEndOrSingleSlash, post, _}
import akka.http.scaladsl.server.Route
import akka.stream.ActorMaterializer
import com.nyavro.tobuy.auth.AuthDirectives
import com.nyavro.tobuy.services.RouteProvider
import spray.json.DefaultJsonProtocol

import akka.actor.ActorSystem
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.stream.ActorMaterializer

import spray.json._

import scala.concurrent.ExecutionContextExecutor

import scala.concurrent.ExecutionContext

class GroupRoute(service: GroupService, directives: AuthDirectives)(
  implicit val system: ActorSystem,
  implicit val executor: ExecutionContext,
  implicit val materializer: ActorMaterializer
) extends RouteProvider with SprayJsonSupport with DefaultJsonProtocol {

  case class GroupCreate(name: String)

  case class GroupJoin(id: Long)

  implicit val createFormat = jsonFormat1(GroupCreate)
  implicit val joinFormat = jsonFormat1(GroupJoin)


  override def route: Route = directives.authenticate { loggedUser =>
    pathPrefix("group") {
      path("view") {
        post {
          complete(
            service.userGroups(loggedUser.id).map(_.toString)
          )
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
            entity(as[GroupJoin]) { groupJoin =>
              complete(
                service.join(groupJoin.id, loggedUser.id).map(_.toString)
              )
            }
          }
        } ~
        path("leave") {
          post {
            entity(as[GroupJoin]) { groupJoin =>
              complete(
                service.leave(groupJoin.id, loggedUser.id).map(_.toString)
              )
            }
          }
        } ~
        path("delete") {
          post {
            entity(as[GroupJoin]) { groupJoin =>
              complete(
                service.delete(groupJoin.id, loggedUser.id).map(_.toString)
              )
            }
          }
        } ~
        path("test") {
          get {
            complete(OK)
          }
        }
    }
  }
}
