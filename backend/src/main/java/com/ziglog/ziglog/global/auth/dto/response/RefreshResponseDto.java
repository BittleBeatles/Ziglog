package com.ziglog.ziglog.global.auth.dto.response;

public class RefreshResponseDto {
    private String grantType = "Bearer";
    private String refreshToken;

    public RefreshResponseDto(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
