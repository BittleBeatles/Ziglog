package com.ziglog.ziglog.global.exception.exceptions;

import com.ziglog.ziglog.global.exception.CommonExceptionCode;

public class UnknownException extends RuntimeException {
    public UnknownException(){
        super(CommonExceptionCode.UNKNOWN_EXCEPTION.getErrorMessage());
    }
    public UnknownException(String message){
        super(message);
    }
}
