package com.ziglog.ziglog.global.notification.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.global.notification.repository.EmitterRedisRepository;
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
    private static final Long TIMEOUT = 1000 * 60 * 30L;// 30분 => 따로 yml 파일에 넣기
    private final EmitterRedisRepository emitterRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public SseEmitter subscribe(Long memberId) {
        SseEmitter emitter = createEmitter(memberId);
        notifyEvent(memberId, "Event stream created");
        return emitter;
    }

    @Override
    public void notifyEvent(Long memberId, Object event) {
        SseEmitter emitter = emitterRepository.get(memberId);
        if (emitter != null) {
            try {
                log.info("emitter send");
                emitter.send(SseEmitter.event().id(String.valueOf(memberId)).name("sse").data(event));
            } catch (Exception e){
                emitterRepository.deleteById(memberId);
                emitter.completeWithError(new IOException("서버로부터 이벤트를 수신할 수 없습니다."));
            }
        }
        else {
            log.info("emitter null");
        }
    }

    @Override
    public void delete(Member member, Long notificationId) throws UserNotFoundException  {//+ 이미 삭제, 알림 주인 아님

    }

    private SseEmitter createEmitter(Long memberId){
        log.info("create new Emitter");
        SseEmitter sseEmitter = new SseEmitter(TIMEOUT);
        emitterRepository.put(memberId, sseEmitter);
        log.info("put new Emitter");
        return sseEmitter;
    }
}
