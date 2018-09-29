package com.nyavro.tobuy.util

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.{ExecutionContext, Future}

trait UtilService {
  def clean(tables: List[String]): Future[List[Int]]
}

class UtilServiceImpl(db: Database)(implicit ec: ExecutionContext) extends UtilService{
  override def clean(tables: List[String]): Future[List[Int]] =
    db.run {
      val q: DBIO[List[Int]] = DBIO.sequence(tables.map(table => sqlu"""DELETE FROM "#$table""""))
      q
    }
}
