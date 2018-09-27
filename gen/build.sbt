libraryDependencies ++= Seq(
  "com.typesafe.slick" %% "slick-codegen" % "3.2.3"
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
