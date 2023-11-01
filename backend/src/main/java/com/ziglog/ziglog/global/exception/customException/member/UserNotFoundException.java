package com.ziglog.ziglog.global.exception.customException.member;

import com.ziglog.ziglog.global.exception.exceptionCode.MemberExceptionCode;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(){
        super(MemberExceptionCode.USER_NOT_FOUND_EXCEPTION.getErrorMessage());
    }

    public UserNotFoundException(String message){
        super(message);
    }

}
