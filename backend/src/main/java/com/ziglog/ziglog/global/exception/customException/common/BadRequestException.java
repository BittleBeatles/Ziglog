package com.ziglog.ziglog.global.exception.customException.common;

import com.ziglog.ziglog.global.exception.exceptionCode.CommonExceptionCode;

public class BadRequestException extends RuntimeException {
    public BadRequestException(){
        super(CommonExceptionCode.BAD_REQUEST_EXCEPTION.getErrorMessage());
    }
    public BadRequestException(String message){
        super(message);
    }
}
