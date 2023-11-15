package com.ziglog.ziglog.domain.notification.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.notification.dto.NotificationKafkaDto;
import com.ziglog.ziglog.domain.notification.dto.NotificationListDto;
import com.ziglog.ziglog.domain.notification.entity.Notification;
import com.ziglog.ziglog.domain.notification.exception.exceptions.AlreadyRemovedNotificationException;
import com.ziglog.ziglog.domain.notification.exception.exceptions.InconsistentNotificationOwnerException;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface NotificationService {

    NotificationListDto getNotificationList(Member member);
    SseEmitter subscribe(Member member, String lastEventId) throws Exception;
    void sendMessage(Long id, Object event) throws Exception;
    void delete(Member member, String notificationId) throws AlreadyRemovedNotificationException, InconsistentNotificationOwnerException;
    List<Notification> getNotifications(Member member);
    void readNotification(Member member, String notificationId) throws InconsistentNotificationOwnerException, AlreadyRemovedNotificationException;
    Notification getVerified(Member member, String notificationId) throws InconsistentNotificationOwnerException, AlreadyRemovedNotificationException;

    void consumeKafkaEvent(NotificationKafkaDto notificationKafkaDto, Acknowledgment ack) throws Exception;

    void saveKafkaEventIntoRDB(NotificationKafkaDto notification, Acknowledgment ack) throws Exception;
}
