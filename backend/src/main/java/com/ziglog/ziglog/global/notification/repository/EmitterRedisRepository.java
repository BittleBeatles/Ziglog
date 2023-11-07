package com.ziglog.ziglog.global.notification.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class EmitterRedisRepository {

    private final Map<Long, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    public void put(Long id, SseEmitter emitter) {
        emitterMap.put(id, emitter);
        //여기 인메모리가 아니라 Redis에 올려야 함
        //pub-sub으로 여기서 올려도 다른 스프링 부트 서버를 올렸을 때 알 수 있도록 해줘야 함
    }

    public SseEmitter get(Long id){
        return emitterMap.get(id);
    }

    public void deleteById(Long id) {
        emitterMap.remove(id);
    }
}
