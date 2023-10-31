package com.ziglog.ziglog.global.auth.dto.response;

import lombok.Getter;

@Getter
public class RefreshResponseDto {
    private String grantType = "Bearer";
    private String accessToken;

    public RefreshResponseDto(String accessToken) {
        this.accessToken = accessToken;
    }

}
