package com.nyavro.tobuy.services.security

import java.time.ZonedDateTime
import java.time.temporal.ChronoUnit
import java.util
import java.util.Date
import java.util.concurrent.TimeUnit

import io.jsonwebtoken.{Jwts, SignatureAlgorithm}

import scala.util.Try

class TokenServiceImpl(secret: Base64Wrapper) extends TokenService {

  val USER_ID_CLAIM = "id"

  override def parseToken(token: String): Option[TokenUser] = {
      Try(Jwts.parser()
        .setSigningKey(secret.encoded.value)
        .parseClaimsJws(token)
        .getBody
      )
        .toOption
        .map(claims => TokenUser(claims.get(USER_ID_CLAIM, classOf[Number]).longValue))
  }

  override def createToken(user:TokenUser): String = {
    val map = new util.HashMap[String, AnyRef]()
    map.put(USER_ID_CLAIM, user.id.asInstanceOf[Object])
    Jwts
      .builder()
      .setClaims(map)
      .setExpiration(Date.from(ZonedDateTime.now().plus(TimeUnit.DAYS.toMillis(1), ChronoUnit.MILLIS).toInstant))
      .signWith(SignatureAlgorithm.HS512, secret.encoded.value)
      .compact()
  }
}
