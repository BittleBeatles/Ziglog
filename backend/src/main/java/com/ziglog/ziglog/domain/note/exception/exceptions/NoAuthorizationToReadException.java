package com.ziglog.ziglog.domain.note.exception.exceptions;


import com.ziglog.ziglog.domain.note.exception.NoteExceptionCode;

public class NoAuthorizationToReadException extends RuntimeException{
    public NoAuthorizationToReadException(){
        super( NoteExceptionCode.NO_AUTHORIZATION_TO_READ_EXCEPTION.getErrorMessage());
    }

    public NoAuthorizationToReadException(String message){
        super(message);
    }

}
