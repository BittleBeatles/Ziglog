package com.ziglog.ziglog.global.notification.repository;

import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RedisHash
public interface EmitterRedisRepository extends CrudRepository<SseEmitter, Long> {
    // pub - sub 구성해야 됨 근데

}
