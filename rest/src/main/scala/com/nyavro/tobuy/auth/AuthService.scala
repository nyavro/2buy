package com.nyavro.tobuy.auth

import com.nyavro.tobuy.gen.Tables._
import com.nyavro.tobuy.services.security.{Base64Encoded, HashService, TokenUser}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Random

class AuthService(db: Database, hashService: HashService)(implicit executionContext: ExecutionContext) {

  lazy val random = new Random()

  def authenticate(login: String, password: String): Future[Option[TokenUser]] =
    db.run(
      User
        .filter(_.name===login)
        .result
        .headOption
        .map(
          _.filter(
            user => hashService.check(password, user.salt, Base64Encoded(user.passwordHash))
          ).map(
            user => TokenUser(user.id)
          )
        )
    )

  def register(login: String, password: String): Future[Either[String, Boolean]] = {
    val salt = hashService.newSalt()
    val hash = hashService.encode(password, salt)
    db.run(
      User += UserRow(0L, login, hash.value, salt)
    ).map {
      case 0 => Left("Failed to register")
      case _ => Right(true)
    }
  }
}
