package com.ziglog.ziglog.domain.notification.exception.exceptions;

import com.ziglog.ziglog.domain.notification.exception.NotificationExceptionCode;

public class AlreadyRemovedNotificationException extends RuntimeException{
    public AlreadyRemovedNotificationException(){
        super(NotificationExceptionCode.ALREADY_REMOVED_NOTIFICATION_EXCEPTION.getErrorMessage());
    }

    public AlreadyRemovedNotificationException(String message){
        super(message);
    }
}
