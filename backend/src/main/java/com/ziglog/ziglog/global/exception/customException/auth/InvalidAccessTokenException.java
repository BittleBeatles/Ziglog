package com.ziglog.ziglog.global.exception.customException.auth;

import com.ziglog.ziglog.global.exception.exceptionCode.AuthExceptionCode;
import com.ziglog.ziglog.global.exception.exceptionCode.MemberExceptionCode;

public class InvalidAccessTokenException extends Exception{
    public InvalidAccessTokenException(){
        super(AuthExceptionCode.INVALID_ACCESS_TOKEN_EXCEPTION.getErrorMessage());
    }
    public InvalidAccessTokenException(String message){
        super(message);
    }
}
