package com.ziglog.ziglog.global.exception.exceptionCode;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    UNKNOWN_EXCEPTION(400, "알 수 없는 예외가 발생했습니다.");

    private final Integer errorCode;
    private final String errorMessage;

    ExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
