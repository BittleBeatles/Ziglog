package com.ziglog.ziglog.global.notification.service;

import com.ziglog.ziglog.global.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private static final Long TIMEOUT = 1000 * 60 * 30L;// 30분
    private final NotificationRepository notificationRepository;

    @Override
    public SseEmitter subscribe(Long memberId) {
        SseEmitter emitter = createEmitter(memberId);
        notifyEvent(memberId, "Event stream created");
        return emitter;
    }

    @Override
    public void notifyEvent(Long memberId, Object event) {
        SseEmitter emitter = notificationRepository.get(memberId);
        if (emitter != null) {
            try {
                log.info("emitter send");
                emitter.send(SseEmitter.event().id(String.valueOf(memberId)).name("sse").data(event));
            } catch (Exception e){
                notificationRepository.deleteById(memberId);
                emitter.completeWithError(new IOException("서버로부터 이벤트를 수신할 수 없습니다."));
            }
        }
        else {
            log.info("emitter null");
        }

    }

    private SseEmitter createEmitter(Long memberId){
        log.info("create new Emitter");
        SseEmitter sseEmitter = new SseEmitter(TIMEOUT);
        notificationRepository.put(memberId, sseEmitter);
        log.info("put new Emitter");
        return sseEmitter;
    }
}
