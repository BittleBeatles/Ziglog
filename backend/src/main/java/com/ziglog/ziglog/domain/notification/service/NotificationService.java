package com.ziglog.ziglog.domain.notification.service;

import com.ziglog.ziglog.domain.bookmark.entity.Bookmark;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import com.ziglog.ziglog.domain.notification.dto.NotificationDto;
import com.ziglog.ziglog.domain.notification.entity.Notification;
import com.ziglog.ziglog.domain.notification.exception.exceptions.AlreadyRemovedNotificationException;
import com.ziglog.ziglog.domain.notification.exception.exceptions.InconsistentNotificationOwnerException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface NotificationService {
    SseEmitter subscribe(Member member, String lastEventId) throws Exception;
    void sendMessage(Long id, Object event) throws Exception;

    void produceKafkaEvent(Notification notification) throws Exception;
    void consumeKafkaEvent(NotificationDto notificationDto) throws Exception;

    void delete(Member member, Long notificationId) throws AlreadyRemovedNotificationException, InconsistentNotificationOwnerException;
    List<Notification> getNotifications(Member member);
    Notification saveBookmarkNotification(Member member, Bookmark bookmark);
    Notification saveQuotationNotification(Member member, Quotation quotation);

    void readNotification(Member member, Long notificationId) throws InconsistentNotificationOwnerException, AlreadyRemovedNotificationException;
}
