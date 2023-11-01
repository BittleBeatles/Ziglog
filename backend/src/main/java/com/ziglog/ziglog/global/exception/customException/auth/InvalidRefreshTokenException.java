package com.ziglog.ziglog.global.exception.customException.auth;

import com.ziglog.ziglog.global.exception.exceptionCode.AuthExceptionCode;

public class InvalidRefreshTokenException extends Exception{
    public InvalidRefreshTokenException(){
        super(AuthExceptionCode.INVALID_REFRESH_TOKEN_EXCEPTION.getErrorMessage());
    }
    public InvalidRefreshTokenException(String message){
        super(message);
    }
}
