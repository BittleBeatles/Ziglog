package com.ziglog.ziglog.global.exception.exceptionCode;

import lombok.Getter;

@Getter
public enum BookmarkExceptionCode {

    ;


    private final Integer errorCode;
    private final String errorMessage;

    BookmarkExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
