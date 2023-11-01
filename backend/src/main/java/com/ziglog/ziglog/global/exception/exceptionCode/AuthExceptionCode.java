package com.ziglog.ziglog.global.exception.exceptionCode;

import lombok.Getter;

@Getter
public enum AuthExceptionCode {
    INVALID_ACCESS_TOKEN_EXCEPTION(401, "유효한 액세스 토큰이 없습니다."),
    INVALID_REFRESH_TOKEN_EXCEPTION(401, "유효한 리프레시 토큰이 없습니다");

    private final Integer errorCode;
    private final String errorMessage;

    AuthExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

}
