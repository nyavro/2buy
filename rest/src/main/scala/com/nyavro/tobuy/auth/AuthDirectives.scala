package com.nyavro.tobuy.auth

import akka.http.scaladsl.server._
import com.nyavro.tobuy.services.security.{TokenService, TokenUser}
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model.headers.HttpChallenges
import akka.http.scaladsl.server.AuthenticationFailedRejection.CredentialsRejected

class AuthDirectives(tokenService:TokenService) {

  val TokenHeader = "Token"

  import akka.http.scaladsl.server.directives.BasicDirectives._
  import akka.http.scaladsl.server.directives.HeaderDirectives._
  import akka.http.scaladsl.server.directives.RouteDirectives._

  def authenticate: Directive1[TokenUser] = {
    headerValueByName(TokenHeader).map(tokenService.parseToken)
      .flatMap {
        case Some(user) => provide(user)
        case _ => reject(AuthenticationFailedRejection(CredentialsRejected, HttpChallenges.oAuth2("2buy")))
      }
  }
}
