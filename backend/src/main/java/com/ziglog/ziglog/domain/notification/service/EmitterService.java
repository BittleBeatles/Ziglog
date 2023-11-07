package com.ziglog.ziglog.domain.notification.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

public interface EmitterService {

    SseEmitter subscribe(Member member);

    //이벤트 객체 전송
    void notifyEvent(Member member, Object event) throws IOException;
}
