package com.ziglog.ziglog.global.exception.customException.common;

import com.ziglog.ziglog.global.exception.exceptionCode.CommonExceptionCode;

public class UnknownException extends RuntimeException {
    public UnknownException(){
        super(CommonExceptionCode.UNKNOWN_EXCEPTION.getErrorMessage());
    }
    public UnknownException(String message){
        super(message);
    }
}
