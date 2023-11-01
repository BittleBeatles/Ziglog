package com.ziglog.ziglog.global.exception.customException.common;

import com.ziglog.ziglog.global.exception.exceptionCode.ExceptionCode;

public class BadRequestException extends RuntimeException {
    public BadRequestException(){
        super(ExceptionCode.BAD_REQUEST_EXCEPTION.getErrorMessage());
    }
    public BadRequestException(String message){
        super(message);
    }
}
