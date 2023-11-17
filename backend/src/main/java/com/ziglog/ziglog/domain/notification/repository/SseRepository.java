package com.ziglog.ziglog.domain.notification.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SseRepository {
    private static final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    public Optional<SseEmitter> findById(Long id){
        return Optional.ofNullable(emitters.get(id));
    }

    public void save(Long memberId, SseEmitter emitter){
        emitters.put(memberId, emitter);
    }

    public void remove(Long id){
        emitters.remove(id);
    }




}
