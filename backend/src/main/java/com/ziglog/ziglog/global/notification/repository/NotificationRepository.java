package com.ziglog.ziglog.global.notification.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class NotificationRepository {

    private final Map<Long, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    public void put(Long id, SseEmitter emitter) {
        emitterMap.put(id, emitter);
    }

    public SseEmitter get(Long id){
        return emitterMap.get(id);
    }

    public void deleteById(Long id) {
        emitterMap.remove(id);
    }


}
