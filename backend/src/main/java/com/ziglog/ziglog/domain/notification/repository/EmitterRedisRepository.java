package com.ziglog.ziglog.domain.notification.repository;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.notification.entity.Emitter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;


@Repository
public class EmitterRedisRepository {
    private static final Map<Long, Emitter> emitters = new ConcurrentHashMap<>();

    public Optional<Emitter> findById(Long id){
        return Optional.ofNullable(emitters.get(id));
    }

    public void save(Member member, Emitter emitter){
        emitters.put(member.getId(), emitter);
    }

    public void deleteById(Long id){
        emitters.remove(id);
    }

}
