package com.ziglog.ziglog.global.auth.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "refreshToken", timeToLive = 60 * 60 * 24 * 7)//1주일간 유효
@AllArgsConstructor
@Getter
public class RefreshToken {

    @Id
    private String refreshToken;

    private Long memberId;
}