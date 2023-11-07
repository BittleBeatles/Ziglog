package com.ziglog.ziglog.global.notification.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.global.notification.entity.Notification;
import com.ziglog.ziglog.global.notification.exception.exceptions.AlreadyRemovedNotificationException;
import com.ziglog.ziglog.global.notification.exception.exceptions.InconsistentNotificationOwnerException;
import com.ziglog.ziglog.global.notification.repository.EmitterRedisRepository;
import com.ziglog.ziglog.global.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    //RDB에서의 알림 관리

    private final NotificationRepository notificationRepository;

    @Override // 주어진 아이디의 알림을 DB에서 삭제
    public void delete(Member member, Long notificationId) throws AlreadyRemovedNotificationException, InconsistentNotificationOwnerException {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(AlreadyRemovedNotificationException::new);
        if (!notification.getOwner().getId().equals(member.getId())) throw new InconsistentNotificationOwnerException();
        notificationRepository.delete(notification);
    }

    @Override //현재 로그인한 사용자의 모든 알림을 조회
    public List<Notification> getNotifications (Member member) {
        return notificationRepository.findAllByOwner(member);
    }


}
