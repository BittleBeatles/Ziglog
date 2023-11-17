package com.ziglog.ziglog.domain.notification.exception.exceptions;

import com.ziglog.ziglog.domain.notification.exception.NotificationExceptionCode;

public class InconsistentNotificationOwnerException extends RuntimeException{
    public InconsistentNotificationOwnerException(){
        super(NotificationExceptionCode.INCONSISTENT_NOTIFICATION_OWNER_EXCEPTION.getErrorMessage());
    }

    public InconsistentNotificationOwnerException(String message){
        super(message);
    }
}
