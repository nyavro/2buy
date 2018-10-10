package com.nyavro.tobuy.group

import java.sql.Timestamp

import com.nyavro.tobuy.gen.Tables.{Group, _}
import com.nyavro.tobuy.models.{GroupView, PaginatedItems, Pagination}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.{ExecutionContext, Future}

trait GroupService {
  def create(name: String, ownerUserId: Long): Future[Long]
  def rename(groupId: Long, name: String, initiatorUserId: Long): Future[Int]
  def delete(groupId: Long, initiatorUserId: Long): Future[Int]
  def userGroups(userId: Long, pagination: Pagination): Future[PaginatedItems[GroupView]]
  def join(groupId: Long, userId: Long): Future[Int]
  def leave(groupId: Long, userId: Long): Future[Int]
  def groupMembers(groupId: Long, userId: Long): Future[Seq[(Long, String)]]
}

class GroupServiceImpl(db: Database)(implicit ec: ExecutionContext) extends GroupService {

  override def create(name: String, ownerUserId: Long): Future[Long] =
    db.run(
      (for {
        groupId <- Group.returning(Group.map(_.id)) += GroupRow(0L, ownerUserId, name, new Timestamp(System.currentTimeMillis()))
        addToGroup <- UserGroup += UserGroupRow(ownerUserId, groupId)
      } yield groupId).transactionally
    )

  override def rename(groupId: Long, name: String, initiatorUserId: Long): Future[Int] =
    db.run {
      Group
        .filter(group => group.id===groupId && group.ownerUserId === initiatorUserId)
        .map(_.name)
        .update(name)
    }

  override def delete(groupId: Long, initiatorUserId: Long): Future[Int] =
    db.run {
      val q1 = Group.filter(group => group.id === groupId && group.ownerUserId === initiatorUserId).result.headOption
      val q2 = UserGroup.filter(userGroup => userGroup.groupId===groupId)
      val q3 = Group.filter(group => group.id === groupId && group.ownerUserId === initiatorUserId)
      for {
        v1 <- q1
        if v1.isDefined
        _ <- q2.delete
        r <- q3.delete
      } yield r
    }

  override def userGroups(userId: Long, pagination: Pagination = Pagination()): Future[PaginatedItems[GroupView]] =
    db.run {
      UserGroup
        .filter(_.userId===userId)
        .drop(pagination.offsetValue)
        .take(pagination.countValue + 1)
        .join(Group).on(_.groupId===_.id)
        .result
    }.map (res =>
      PaginatedItems.toPage(
        res.map{case (_, group) => GroupView(group.id, group.name, group.lastActivity)},
        pagination
      )
    )

  override def join(groupId: Long, userId: Long): Future[Int] =
    db.run {
      val q1 = for {group <- Group.filter(_.id === groupId)} yield group.lastActivity
      for {
        _ <- q1.update(new Timestamp(System.currentTimeMillis()))
        res <- UserGroup += UserGroupRow(userId, groupId)
      } yield res
    }

  override def leave(groupId: Long, userId: Long): Future[Int] =
    db.run {
      val q1 = Group.filter(group => group.id === groupId && group.ownerUserId =!= userId).result.headOption
      val q2 = UserGroup.filter(userGroup => userGroup.groupId === groupId && userGroup.userId === userId)
      val q3 = for {group <- Group.filter(_.id === groupId)} yield group.lastActivity
      for {
        v1 <- q1
        if v1.isDefined
        _ <- q3.update(new Timestamp(System.currentTimeMillis()))
        r <- q2.delete
      } yield r
    }

  override def groupMembers(groupId: Long, userId: Long): Future[Seq[(Long, String)]] =
    db
      .run {
        for {
          ug <- UserGroup.filter(ug => ug.groupId === groupId && ug.userId === userId).result.headOption
          if ug.isDefined
          u <- UserGroup.filter(_.groupId === groupId).join(User).on(_.userId === _.id).map {case (_, u) => (u.id, u.name)}.result
        } yield u
      }
}
