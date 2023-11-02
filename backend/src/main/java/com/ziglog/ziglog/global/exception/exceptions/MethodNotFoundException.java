package com.ziglog.ziglog.global.exception.exceptions;

import com.ziglog.ziglog.global.exception.CommonExceptionCode;

public class MethodNotFoundException extends RuntimeException {
    public MethodNotFoundException(){
        super(CommonExceptionCode.METHOD_NOT_FOUND_EXCEPTION.getErrorMessage());
    }
    public MethodNotFoundException(String message){
        super(message);
    }
}
