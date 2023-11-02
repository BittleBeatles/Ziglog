package com.ziglog.ziglog.domain.member.exception.exceptions;

import com.ziglog.ziglog.domain.member.exception.MemberExceptionCode;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(){
        super(MemberExceptionCode.USER_NOT_FOUND_EXCEPTION.getErrorMessage());
    }
    public UserNotFoundException(String message){
        super(message);
    }

}
