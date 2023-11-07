package com.ziglog.ziglog.global.notification.exception;

import lombok.Getter;

@Getter
public enum NotificationExceptionCode {
    ;

    private final Integer errorCode;
    private final String errorMessage;

    NotificationExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
