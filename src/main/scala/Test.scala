import com.typesafe.config.ConfigFactory
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext.Implicits.global
import slick.driver.PostgresDriver

object Test {

  def main(args: Array[String]): Unit = {

    val db = Database.forConfig("2buy")
    try {
    } finally db.close()
  }
}
