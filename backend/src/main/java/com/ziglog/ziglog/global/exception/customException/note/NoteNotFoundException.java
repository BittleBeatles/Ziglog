package com.ziglog.ziglog.global.exception.customException.note;


import com.ziglog.ziglog.global.exception.exceptionCode.NoteExceptionCode;

public class NoteNotFoundException extends RuntimeException{
    public NoteNotFoundException(){
        super( NoteExceptionCode.NOTE_NOT_FOUND_EXCEPTION.getErrorMessage());
    }

    public NoteNotFoundException(String message){
        super(message);
    }

}
