package com.ziglog.ziglog.global.notification.exception;

import lombok.Getter;

@Getter
public enum NotificationExceptionCode {
    INCONSISTENT_NOTIFICATION_OWNER_EXCEPTION(403, "해당 알림을 지울 권한이 없습니다"),
    ALREADY_REMOVED_NOTIFICATION_EXCEPTION(400, "이미 지워진 알림입니다");

    private final Integer errorCode;
    private final String errorMessage;

    NotificationExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
