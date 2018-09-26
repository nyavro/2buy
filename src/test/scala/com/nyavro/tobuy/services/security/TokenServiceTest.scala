package com.nyavro.tobuy.services.security

import org.scalatest.{Matchers, WordSpec}

class TokenServiceTest extends WordSpec with Matchers {

  "TokenService" should {
    "Encode user into token" in {
      val strSecret = "test"
      val service = new TokenServiceImpl(new Base64Wrapper(strSecret))
      val userId = Long.box(123321L)
      val token = service.createToken(TokenUser(userId))
      val checkService = new TokenServiceImpl(new Base64Wrapper(strSecret))
      val parsed = checkService.parseToken(token).map(_.id).getOrElse("Invalid")
      parsed should === (userId)
    }

    "Invalid token parse fails" in {
      val service = new TokenServiceImpl(new Base64Wrapper("test2"))
      val parsed = service.parseToken("some invalid token here").map(_.id).getOrElse("Invalid")
      parsed should === ("Invalid")
    }

    "Decode real token" in {
      val service = new TokenServiceImpl(new Base64Wrapper("secret"))
      val parsed = service
        .parseToken("eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNTM4MDQ1MTQwfQ.NzK8pATICVMfNMjWIJRQW64zF3z0HbJnb1UBz0lFA1ZzEDQV_mX4x2Eapa9G1VGe2rJp-he-aWm3YSaS-aqvKw")
        .map(_.id)
        .getOrElse("invalid")
      parsed should === (1)
    }
  }
}