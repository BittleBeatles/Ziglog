package com.ziglog.ziglog.global.auth.exception.exceptions;

import com.ziglog.ziglog.global.auth.exception.AuthExceptionCode;

public class InvalidAccessTokenException extends RuntimeException {
    public InvalidAccessTokenException(){
        super(AuthExceptionCode.INVALID_ACCESS_TOKEN_EXCEPTION.getErrorMessage());
    }
    public InvalidAccessTokenException(String message){
        super(message);
    }
}
