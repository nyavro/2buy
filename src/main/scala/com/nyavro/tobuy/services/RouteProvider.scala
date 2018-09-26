package com.nyavro.tobuy.services

import akka.http.scaladsl.server.Route

trait RouteProvider {
  def route:Route
}
