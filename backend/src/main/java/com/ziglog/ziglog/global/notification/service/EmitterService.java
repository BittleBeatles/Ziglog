package com.ziglog.ziglog.global.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

public interface EmitterService {

    SseEmitter subscribe(Long memberId);

    //이벤트 객체 전송
    void notifyEvent(Long memberId, Object event) throws IOException;
}
