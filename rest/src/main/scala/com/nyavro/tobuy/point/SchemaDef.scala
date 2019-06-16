package com.nyavro.tobuy.point

import com.nyavro.tobuy.group.GroupService
import com.nyavro.tobuy.models.{Group, Identifiable, Product, User}
import com.nyavro.tobuy.product.ProductService
import sangria.schema._

object SchemaTypes {
  import sangria.macros.derive._

  val IdentifiableType = InterfaceType(
    "Identifiable",
    "Entity that can be identified",
    fields[Unit, Identifiable](
      Field("id", LongType, resolve = _.value.id)
    )
  )

  implicit val UserType: ObjectType[Unit, User] =
    deriveObjectType[Unit, User](
      Interfaces(IdentifiableType),
      DocumentField("name", "User's name") //by defaul macro cosinders fields only
    )

  implicit val GroupType: ObjectType[Unit, Group] =
    deriveObjectType[Unit, Group](
      Interfaces(IdentifiableType),
      DocumentField("name", "Group's name") //by defaul macro cosinders fields only
    )

  implicit val ProductType: ObjectType[Unit, Product] =
    deriveObjectType[Unit, Product](
      Interfaces(IdentifiableType),
      DocumentField("name", "Product's name") //by defaul macro cosinders fields only
    )
}

class SchemaDef(productService: ProductService) {

  import SchemaTypes._
  /**
    * case class Order(
      * id: Long,
      * product: Product,
      * count: Int,
      * comment: Option[String],
      * status: OrderStatus.Value,
      * version: Int,
      * createdBy: User,
      * createdAt: Date,
      * lastModifiedBy: User,
      * lastModifiedAt: Date
      * ) extends Identifiable
    *
    * case class GroupView(id: Long, name: String, lastActivity: Date) extends Identifiable
    *
    */

//  implicit val CategoryType: ObjectType[Unit, Category] =
//    deriveObjectType[Unit, Category](
//      Interfaces(IdentifiableType),
//      ObjectTypeDescription("The category of products")
//def add(name: String): Future[Long]
//  def list(): Future[Seq[models.Product]]
//    )

  val QueryType = ObjectType(
    "Query",
    fields[ProductService, Unit](
      Field("allProducts", ListType(ProductType),
        description = Some("Returns a list of all available products."),
        resolve = _.ctx.list()
      )
//      ,
//      Field("userGroups", ListType(GroupType),
//        description = Some("Returns a list of user's groups"),
//        arguments = Argument("id", IntType) :: Nil,
//        resolve = c => c.ctx.groupMembers(c.arg[Long]("id"), c.)),
    )
  )

  val ShopSchema = Schema(QueryType) //define entry point
}
