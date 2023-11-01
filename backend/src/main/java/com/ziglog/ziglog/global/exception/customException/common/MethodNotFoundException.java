package com.ziglog.ziglog.global.exception.customException.common;

import com.ziglog.ziglog.global.exception.exceptionCode.CommonExceptionCode;

public class MethodNotFoundException extends RuntimeException {
    public MethodNotFoundException(){
        super(CommonExceptionCode.METHOD_NOT_FOUND_EXCEPTION.getErrorMessage());
    }
    public MethodNotFoundException(String message){
        super(message);
    }
}
