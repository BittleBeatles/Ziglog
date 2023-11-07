package com.ziglog.ziglog.domain.notification.exception;

import com.ziglog.ziglog.domain.notification.exception.exceptions.AlreadyRemovedNotificationException;
import com.ziglog.ziglog.domain.notification.exception.exceptions.InconsistentNotificationOwnerException;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RequiredArgsConstructor
@RestControllerAdvice("com.ziglog.ziglog")
public class NotificationExceptionController {

    @ExceptionHandler(InconsistentNotificationOwnerException.class)
    public ResponseDto<String> handleInconsistentNotificationOwnerException (InconsistentNotificationOwnerException err){
        return toResponseDto(NotificationExceptionCode.INCONSISTENT_NOTIFICATION_OWNER_EXCEPTION);
    }

    @ExceptionHandler(AlreadyRemovedNotificationException.class)
    public ResponseDto<String> handleAlreadyRemovedNotificationException (AlreadyRemovedNotificationException err){
        return toResponseDto(NotificationExceptionCode.ALREADY_REMOVED_NOTIFICATION_EXCEPTION);
    }

    public static ResponseDto<String> toResponseDto(NotificationExceptionCode exceptionCode){
        return ResponseDto.of(exceptionCode.getErrorCode(), exceptionCode.getErrorMessage());
    }
}
