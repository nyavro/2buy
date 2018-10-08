package com.nyavro.tobuy.util

import java.sql.Timestamp

import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat
import spray.json.{DeserializationException, JsString, JsValue, JsonFormat}

trait CustomFormats {
  implicit object TimestampFormat extends JsonFormat[Timestamp] {
    val format = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")

    def write(timestamp: Timestamp) = {
      val dt = new DateTime(timestamp.getTime)
      JsString(format.print(dt))
    }
    def read(json: JsValue) = json match {
      case JsString(time) => {
        val dt = format.parseDateTime(time)
        new Timestamp(dt.getMillis)
      }
      case _ => throw new DeserializationException("Date expected")
    }
  }
}
