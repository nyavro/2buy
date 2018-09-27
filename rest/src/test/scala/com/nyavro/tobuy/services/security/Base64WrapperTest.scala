package com.nyavro.tobuy.services.security

import org.scalatest.{Matchers, WordSpec}

class Base64WrapperTest extends WordSpec with Matchers {

  "Wrapper" should {
    "Wrap base64" in {
      val wrap = new Base64Wrapper("secret")
      val encoded = wrap.encoded
      val wrap2 = new Base64Wrapper(encoded)
      wrap.value should === (wrap2.value)
    }
  }
}