package com.ziglog.ziglog.global.exception.exceptionCode;

import lombok.Getter;

@Getter
public enum AuthExceptionCode {

    ;



    private final Integer errorCode;
    private final String errorMessage;

    AuthExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

}
