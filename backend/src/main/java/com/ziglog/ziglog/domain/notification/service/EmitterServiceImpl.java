package com.ziglog.ziglog.domain.notification.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.notification.entity.Emitter;
import com.ziglog.ziglog.domain.notification.repository.EmitterRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmitterServiceImpl implements EmitterService {
    //TODO
    //브라우저와의 연결 관리. Redis에 올라간 SseEmitter 객체 관리
    private static final Long TIMEOUT = 1000 * 60 * 30L;// 30분 => 따로 yml 파일에 넣기
    private final EmitterRedisRepository emitterRepository;

    @Override
    public SseEmitter subscribe(Member member) throws Exception {
        SseEmitter emitter = createEmitter(member);
        notifyEvent(member, "Event stream created");
        return emitter;
    }

    @Override
    public void notifyEvent(Member target, Object event) throws Exception {
        SseEmitter sseEmitter = getEmitter(target);
        try {
            log.info("snet event");
            sseEmitter.send(SseEmitter.event().id(String.valueOf(target.getId())).name("sse").data("hello"));
        } catch (Exception e){
            emitterRepository.deleteById(target.getId());
            sseEmitter.completeWithError(new IOException("서버로부터 이벤트를 보낼 수 없습니다."));
        }
    }

    private SseEmitter createEmitter(Member member) {
        log.info("create new Emitter");
        SseEmitter sseEmitter = new SseEmitter(TIMEOUT);
        emitterRepository.save(member,
                Emitter.builder()
                        .id(member.getId())
                        .emitter(sseEmitter)
                    .build());

        log.info("put new Emitter");
        return sseEmitter;
    }

    private SseEmitter getEmitter(Member member) throws Exception {
        Emitter emitter = emitterRepository.findById(member.getId()).orElseThrow(Exception::new);
        return emitter.getEmitter();
    }
}
