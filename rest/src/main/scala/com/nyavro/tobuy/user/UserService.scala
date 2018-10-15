package com.nyavro.tobuy.user

import com.nyavro.tobuy.gen.Tables._
import com.nyavro.tobuy.services.security.{Base64Encoded, HashService, TokenUser}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.{ExecutionContext, Future}

trait UserService {
  def create(login: String, password: String, name: String): Future[Long]
  def find(login: String, password: String): Future[Option[(Long, String)]]
}

class UserServiceImpl(db: Database, hashService: HashService)(implicit ec: ExecutionContext) extends UserService {

  override def create(login: String, password: String, name: String): Future[Long] = {
    val salt = hashService.newSalt()
    val hash = hashService.encode(password, salt)
    db.run(User.returning(User.map(_.id)) += UserRow(0L, login, name, hash.value, salt))
  }

  override def find(login: String, password: String): Future[Option[(Long, String)]] =
    db
      .run (
        User
          .filter(_.login === login)
          .result
          .headOption
      )
      .map(
        _.collect {case user if hashService.check(password, user.salt, Base64Encoded(user.passwordHash)) => (user.id, user.name)}
      )
}
