package com.nyavro.tobuy.services

import akka.http.scaladsl.server._

class CustomDirectives(authService:AuthService) {

  val TokenHeader = "Token"

  import akka.http.scaladsl.server.directives.BasicDirectives._
  import akka.http.scaladsl.server.directives.FutureDirectives._
  import akka.http.scaladsl.server.directives.HeaderDirectives._
  import akka.http.scaladsl.server.directives.RouteDirectives._

//  def authenticate: Directive1[User] = {
//    headerValueByName(TokenHeader).flatMap { token =>
//      onSuccess(authService.authenticate(token)).flatMap {
//        case Some(user) => provide(user)
//        case None       => reject
//      }
//    }
//  }
}
