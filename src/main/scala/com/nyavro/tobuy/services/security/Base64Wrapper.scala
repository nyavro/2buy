package com.nyavro.tobuy.services.security

import io.jsonwebtoken.impl.TextCodec

case class Base64Encoded(value: String)

class Base64Wrapper private (val value: String, val encoded: Base64Encoded) {
  def this(value: String) = this(value, Base64Encoded(TextCodec.BASE64.encode(value)))
  def this(encoded: Base64Encoded) = this(TextCodec.BASE64.decodeToString(encoded.value), encoded)
}
