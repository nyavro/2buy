package com.nyavro.tobuy.auth

import akka.http.scaladsl.server._
import com.nyavro.tobuy.services.security.{TokenService, TokenUser}

class AuthDirectives(tokenService:TokenService) {

  val TokenHeader = "Token"

  import akka.http.scaladsl.server.directives.BasicDirectives._
  import akka.http.scaladsl.server.directives.HeaderDirectives._
  import akka.http.scaladsl.server.directives.RouteDirectives._

  def authenticate: Directive1[TokenUser] = {
    headerValueByName(TokenHeader).map(tokenService.parseToken)
      .flatMap {
        case Some(user) => provide(user)
        case _ => reject
      }
  }
}
