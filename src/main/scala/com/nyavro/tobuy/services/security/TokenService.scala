package com.nyavro.tobuy.services.security

case class TokenUser(id: Long)

trait TokenService {
  def parseToken(token: String): Option[TokenUser]
  def createToken(user:TokenUser): String
}
