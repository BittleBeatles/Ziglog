package com.ziglog.ziglog.global.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {

    //SSE 연결 만들기
    SseEmitter subscribe(Long memberId);

    //이벤트 객체 전송
    void notifyEvent(Long memberId, Object event);
}
