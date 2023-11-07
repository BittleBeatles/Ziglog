package com.ziglog.ziglog.global.notification.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.global.notification.entity.Notification;
import com.ziglog.ziglog.global.notification.exception.exceptions.AlreadyRemovedNotificationException;
import com.ziglog.ziglog.global.notification.exception.exceptions.InconsistentNotificationOwnerException;
import java.util.List;

public interface NotificationService {

    void delete(Member member, Long notificationId) throws AlreadyRemovedNotificationException, InconsistentNotificationOwnerException;

    List<Notification> getNotifications(Member member);
}
