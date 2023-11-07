package com.ziglog.ziglog.domain.notification.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RedisHash(value = "emitter")
@Getter
@Builder
public class Emitter {

    @Id
    private Long id;
    private SseEmitter emitter;

}
