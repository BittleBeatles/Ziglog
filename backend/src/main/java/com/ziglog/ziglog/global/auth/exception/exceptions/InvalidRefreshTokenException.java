package com.ziglog.ziglog.global.auth.exception.exceptions;

import com.ziglog.ziglog.global.auth.exception.AuthExceptionCode;

public class InvalidRefreshTokenException extends Exception{
    public InvalidRefreshTokenException(){
        super(AuthExceptionCode.INVALID_REFRESH_TOKEN_EXCEPTION.getErrorMessage());
    }
    public InvalidRefreshTokenException(String message){
        super(message);
    }
}
