package com.ziglog.ziglog.global.notification.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
public class NotificationServiceImpl implements NotificationService {


    @Override
    public SseEmitter subscribe(Long memberId) {
        return null;
    }

    @Override
    public void notifyEvent(Long memberId, Object event) {

    }

}
