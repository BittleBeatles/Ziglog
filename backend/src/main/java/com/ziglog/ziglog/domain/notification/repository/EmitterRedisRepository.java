package com.ziglog.ziglog.domain.notification.repository;

import com.ziglog.ziglog.domain.notification.entity.Emitter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RedisHash
public interface EmitterRedisRepository extends CrudRepository<Emitter, Long> {

}
