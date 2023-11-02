package com.ziglog.ziglog.global.exception.exceptions;

import com.ziglog.ziglog.global.exception.CommonExceptionCode;

public class BadRequestException extends RuntimeException {
    public BadRequestException(){
        super(CommonExceptionCode.BAD_REQUEST_EXCEPTION.getErrorMessage());
    }
    public BadRequestException(String message){
        super(message);
    }
}
