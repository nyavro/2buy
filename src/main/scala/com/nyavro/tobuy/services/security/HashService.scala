package com.nyavro.tobuy.services.security

import io.jsonwebtoken.impl.TextCodec
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.PBEKeySpec

import scala.util.Random

class HashService {

  private lazy val factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1")

  def newSalt(): Array[Byte] = {
    val bytes = Array[Byte](16)
    new Random().nextBytes(bytes)
    bytes
  }

  def encode(pwd: String, salt: Array[Byte]): Base64Encoded = {
    val spec = new PBEKeySpec(pwd.toCharArray, salt, 65536, 128)
    Base64Encoded(TextCodec.BASE64.encode(factory.generateSecret(spec).getEncoded))
  }

  def check(pwd: String, salt: Array[Byte], hash: Base64Encoded): Boolean = encode(pwd, salt).value == hash.value
}
