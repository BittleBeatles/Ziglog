package com.ziglog.ziglog.global.exception.customException.common;

import com.ziglog.ziglog.global.exception.exceptionCode.ExceptionCode;

public class UnknownException extends RuntimeException {
    public UnknownException(){
        super(ExceptionCode.UNKNOWN_EXCEPTION.getErrorMessage());
    }
    public UnknownException(String message){
        super(message);
    }
}
