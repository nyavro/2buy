name := "2buy"

version := "0.1"

scalaVersion := "2.12.6"

enablePlugins(FlywayPlugin)

flywayUrl := "jdbc:postgresql://localhost:5432/2buy?createDatabaseIfNotExist=true"
flywayUser := "postgres"
flywayPassword := "postgres"

libraryDependencies ++= Seq(
  "com.typesafe.slick" %% "slick" % "3.2.3",
  "com.typesafe.slick" %% "slick-hikaricp" % "3.2.3",
  "org.postgresql" % "postgresql" % "9.4-1201-jdbc41",
  "org.slf4j" % "slf4j-nop" % "1.6.4",
  "com.typesafe.slick" %% "slick-codegen" % "3.2.3",
  "com.typesafe.akka" %% "akka-http" % "10.1.5",
  "com.typesafe.akka" %% "akka-stream" % "2.5.16",
  "io.jsonwebtoken" % "jjwt" % "0.9.1",
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.1.5",
  "org.scalatest" %% "scalatest" % "3.0.5" % "test"
)

// build.sbt
import slick.codegen.SourceCodeGenerator
import slick.{ model => m }

// required
enablePlugins(CodegenPlugin)

// required
// Register codegen hook
sourceGenerators in Compile += slickCodegen

// required
slickCodegenDatabaseUrl := "jdbc:postgresql://localhost:5432/2buy"

// required
slickCodegenDatabaseUser := "postgres"

// required
slickCodegenDatabasePassword := "postgres"

// required (If not set, postgresql driver is choosen)
//slickCodegenDriver := slick.driver.PostgresDriver

// required (If not set, postgresql driver is choosen)
slickCodegenJdbcDriver := "org.postgresql.Driver"

// optional but maybe you want
slickCodegenOutputPackage := "com.nyavro.tobuy.gen"

// optional, pass your own custom source code generator
slickCodegenCodeGenerator := { (model: m.Model) => new SourceCodeGenerator(model) }

// optional
// For example of all the tables in a database we only would like to take table named "users"
//slickCodegenIncludedTables in Compile := Seq("users")

// optional
// For example, to exclude flyway's schema_version table from the target of codegen. This still applies after slickCodegenIncludedTables.
slickCodegenExcludedTables in Compile := Seq("flyway_schema_history")

//optional
slickCodegenOutputDir := (sourceManaged in Compile).value
