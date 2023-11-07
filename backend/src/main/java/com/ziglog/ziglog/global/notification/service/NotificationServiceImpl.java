package com.ziglog.ziglog.global.notification.service;

import com.ziglog.ziglog.global.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private static final Long TIMEOUT = 1000 * 60 * 30L;// 30분
    private final NotificationRepository notificationRepository;

    @Override
    public SseEmitter subscribe(Long memberId) {
        return null;
    }

    @Override
    public void notifyEvent(Long memberId, Object event) {

    }

    private SseEmitter createEmitter(Long memberId){
        SseEmitter sseEmitter = new SseEmitter(TIMEOUT);



    }



}
