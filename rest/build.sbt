libraryDependencies ++= Seq(
  "org.sangria-graphql" %% "sangria" % "1.2.2",
  "org.sangria-graphql" %% "sangria-spray-json" % "1.0.0",
  "com.typesafe.slick" %% "slick" % "3.2.3",
  "com.typesafe.slick" %% "slick-hikaricp" % "3.2.3",
  "org.postgresql" % "postgresql" % "9.4-1201-jdbc41",
  "com.typesafe.akka" %% "akka-http" % "10.1.8",
  "com.typesafe.akka" %% "akka-stream" % "2.5.19",
  "io.jsonwebtoken" % "jjwt" % "0.9.1",
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.1.5",
  "org.scalatest" %% "scalatest" % "3.0.5" % "test",
  "ch.qos.logback" % "logback-classic" % "1.2.3",
  "com.typesafe.scala-logging" %% "scala-logging" % "3.9.0",
  "joda-time" % "joda-time" % "2.10"
)
