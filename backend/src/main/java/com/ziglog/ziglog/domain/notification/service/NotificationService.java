package com.ziglog.ziglog.domain.notification.service;

import com.ziglog.ziglog.domain.bookmark.entity.Bookmark;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import com.ziglog.ziglog.domain.notification.entity.Notification;
import com.ziglog.ziglog.domain.notification.exception.exceptions.AlreadyRemovedNotificationException;
import com.ziglog.ziglog.domain.notification.exception.exceptions.InconsistentNotificationOwnerException;

import java.util.List;

public interface NotificationService {
    void delete(Member member, Long notificationId) throws AlreadyRemovedNotificationException, InconsistentNotificationOwnerException;
    List<Notification> getNotifications(Member member);
    Notification saveBookmarkNotification(Member member, Bookmark bookmark);
    Notification saveQuotationNotification(Member member, Quotation quotation);
}
