name := "2buy"

version := "0.1"

scalaVersion := "2.12.6"


// PROJECTS

lazy val global = project
  .in(file("."))
  .settings(settings)
  .aggregate(
//    rest,
    db, gen, rest
  )

lazy val db = project.in(file("db"))
lazy val gen = project.in(file("gen")).dependsOn(db)
lazy val rest = project.in(file("rest")).dependsOn(gen)

lazy val dependencies =
  new {
    val logbackV        = "1.2.3"
    val logstashV       = "4.11"
    val scalaLoggingV   = "3.7.2"
    val slf4jV          = "1.7.25"
    val typesafeConfigV = "1.3.1"
    val pureconfigV     = "0.8.0"
    val monocleV        = "1.4.0"
    val akkaV           = "2.5.6"
    val scalatestV      = "3.0.4"
    val scalacheckV     = "1.13.5"

//    val logback        = "ch.qos.logback"             % "logback-classic"          % logbackV
//    val logstash       = "net.logstash.logback"       % "logstash-logback-encoder" % logstashV
//    val scalaLogging   = "com.typesafe.scala-logging" %% "scala-logging"           % scalaLoggingV
//    val slf4j          = "org.slf4j"                  % "jcl-over-slf4j"           % slf4jV
//    val typesafeConfig = "com.typesafe"               % "config"                   % typesafeConfigV
//    val akka           = "com.typesafe.akka"          %% "akka-stream"             % akkaV
//    val monocleCore    = "com.github.julien-truffaut" %% "monocle-core"            % monocleV
//    val monocleMacro   = "com.github.julien-truffaut" %% "monocle-macro"           % monocleV
//    val pureconfig     = "com.github.pureconfig"      %% "pureconfig"              % pureconfigV
//    val scalatest      = "org.scalatest"              %% "scalatest"               % scalatestV
//    val scalacheck     = "org.scalacheck"             %% "scalacheck"              % scalacheckV
    val slick             = "com.typesafe.slick" %% "slick" % "3.2.3"
//    val slick = "com.typesafe.slick" %% "slick-hikaricp" % "3.2.3"
    val postgres          = "org.postgresql" % "postgresql" % "9.4-1201-jdbc41"
    val slf4j             = "org.slf4j" % "slf4j-nop" % "1.6.4"
//    val slickCodegen      = "com.typesafe.slick" %% "slick-codegen" % "3.2.3"
    val akkaHttp          = "com.typesafe.akka" %% "akka-http" % "10.1.5"
    val akkaStream        = "com.typesafe.akka" %% "akka-stream" % "2.5.16"
    val jjwt              = "io.jsonwebtoken" % "jjwt" % "0.9.1"
    val akkaHttpSprayJson = "com.typesafe.akka" %% "akka-http-spray-json" % "10.1.5"
    val scalatest         = "org.scalatest" %% "scalatest" % "3.0.5" % "test"
  }

lazy val commonDependencies = Seq(
  dependencies.scalatest  % "test"
)

lazy val settings = commonSettings

lazy val compilerOptions = Seq(
  "-unchecked",
  "-feature",
  "-language:existentials",
  "-language:higherKinds",
  "-language:implicitConversions",
  "-language:postfixOps",
  "-deprecation",
  "-encoding",
  "utf8"
)

lazy val commonSettings = Seq(
  scalacOptions ++= compilerOptions,
  resolvers ++= Seq(
    "Local Maven Repository" at "file://" + Path.userHome.absolutePath + "/.m2/repository",
    Resolver.sonatypeRepo("releases"),
    Resolver.sonatypeRepo("snapshots")
  )
)
