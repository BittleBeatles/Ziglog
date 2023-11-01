package com.ziglog.ziglog.global.exception;

import lombok.Getter;

@Getter
public enum CommonExceptionCode {
    UNKNOWN_EXCEPTION(500, "알 수 없는 예외가 발생했습니다."),
    METHOD_NOT_FOUND_EXCEPTION(405, "유효하지 않은 메서드입니다"),
    BAD_REQUEST_EXCEPTION(400, "잘못된 요청입니다");

    private final Integer errorCode;
    private final String errorMessage;

    CommonExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
