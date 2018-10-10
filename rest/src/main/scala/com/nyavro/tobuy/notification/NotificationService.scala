package com.nyavro.tobuy.notification

import com.typesafe.scalalogging.LazyLogging

trait NotificationService {
  def groupMemberChange(groupId: Long)
  def groupOrderChange(groupId: Long)
}

class NotificationServiceImpl extends NotificationService with LazyLogging {
  override def groupMemberChange(groupId: Long): Unit = logger.info(s"groupMemberChange: $groupId")
  override def groupOrderChange(groupId: Long): Unit = logger.info(s"groupOrderChange: $groupId")
}
