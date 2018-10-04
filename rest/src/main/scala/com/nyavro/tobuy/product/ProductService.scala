package com.nyavro.tobuy.product

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.PostgresProfile.api._
import com.nyavro.tobuy.gen.Tables._
import com.nyavro.tobuy.models

trait ProductService {
  def add(name: String): Future[Long]
  def list(): Future[Seq[(Long, String)]]
}

class ProductServiceImpl(db: Database)(implicit ec: ExecutionContext) extends ProductService {
  override def add(name: String): Future[Long] =
    db.run {
      Product.returning(Product.map(_.id)) += ProductRow(0L, name)
    }

  override def list(): Future[Seq[(Long, String)]] =
    db.run {
      Product.map(item => (item.id, item.name)).result
    }
}