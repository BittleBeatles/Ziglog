package com.ziglog.ziglog.domain.member.exception.exceptions;

import com.ziglog.ziglog.domain.member.exception.MemberExceptionCode;

public class InvalidUserModificationRequestException extends RuntimeException{
    public InvalidUserModificationRequestException(){
        super(MemberExceptionCode.USER_NOT_FOUND_EXCEPTION.getErrorMessage());
    }

    public InvalidUserModificationRequestException(String message){
        super(message);
    }

}
