package com.nyavro.tobuy.group

import com.nyavro.tobuy.gen.Tables.{Group, _}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.{ExecutionContext, Future}

trait GroupService {
  def create(name: String, ownerUserId: Long): Future[Long]
  def rename(groupId: Long, name: String, initiatorUserId: Long): Future[Int]
  def delete(groupId: Long, initiatorUserId: Long): Future[Int]
  def userGroups(userId: Long): Future[Seq[(String, Long)]]
  def join(groupId: Long, userId: Long): Future[Int]
  def leave(groupId: Long, userId: Long): Future[Int]
  def groupMembers(groupId: Long, userId: Long): Future[Seq[(Long, String)]]
}

class GroupServiceImpl(db: Database)(implicit ec: ExecutionContext) extends GroupService {

  override def create(name: String, ownerUserId: Long): Future[Long] =
    db.run(
      (for {
        groupId <- Group.returning(Group.map(_.id)) += GroupRow(0L, ownerUserId, name)
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

  override def userGroups(userId: Long): Future[Seq[(String, Long)]] =
    db.run {
      UserGroup
        .filter(_.userId===userId)
        .join(Group).on(_.groupId===_.id)
        .map{case (_, group) => (group.name, group.id)}
        .result
    }

  override def join(groupId: Long, userId: Long): Future[Int] =
    db.run(
      UserGroup += UserGroupRow(userId, groupId)
    )

  override def leave(groupId: Long, userId: Long): Future[Int] =
    db.run {
      val q1 = Group.filter(group => group.id === groupId && group.ownerUserId =!= userId).result.headOption
      val q2 = UserGroup.filter(userGroup => userGroup.groupId === groupId && userGroup.userId === userId)
      for {
        v1 <- q1
        if v1.isDefined
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
