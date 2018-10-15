package com.nyavro.tobuy.util

import java.util.Date

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.nyavro.tobuy.models._
import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat
import spray.json.{DefaultJsonProtocol, DeserializationException, JsString, JsValue, JsonFormat}

trait CustomFormats extends SprayJsonSupport with DefaultJsonProtocol {

  implicit object TimestampFormat extends JsonFormat[Date] {
    val format = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")

    def read(json: JsValue) = json match {
      case JsString(time) => new Date(format.parseDateTime(time).getMillis)
      case _ => throw new DeserializationException("Date expected")
    }

    def write(timestamp: Date) = {
      val dt = new DateTime(timestamp.getTime)
      JsString(format.print(dt))
    }
  }

  implicit object OrderStatusFormat extends JsonFormat[OrderStatus.Value] {

    override def read(json: JsValue): OrderStatus.Value = json match {
      case JsString(status) => OrderStatus.withName(status)
      case _ => throw new DeserializationException("OrderStatus expected")
    }

    override def write(obj: OrderStatus.Value): JsValue = JsString(obj.toString)
  }

  implicit val paginationFormat = jsonFormat3(Pagination)
  implicit val productFormat = jsonFormat2(Product)
  implicit val userFormat = jsonFormat2(User)
  implicit val orderFormat = jsonFormat8(Order)
  implicit val groupViewFormat = jsonFormat3(GroupView)
  implicit val ordersFormat = jsonFormat2(PaginatedItems[Order])
  implicit val groupViewListFormat = jsonFormat2(PaginatedItems[GroupView])
}
