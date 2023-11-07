package com.ziglog.ziglog.global.notification.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.global.notification.exception.exceptions.AlreadyRemovedNotificationException;
import com.ziglog.ziglog.global.notification.exception.exceptions.InconsistentNotificationOwnerException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

public interface NotificationService {

    //SSE 연결 만들기
    SseEmitter subscribe(Long memberId);

    //이벤트 객체 전송
    void notifyEvent(Long memberId, Object event) throws IOException;

    void delete(Member member, Long notificationId) throws AlreadyRemovedNotificationException, InconsistentNotificationOwnerException;
}
