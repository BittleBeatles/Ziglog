package com.ziglog.ziglog.domain.note.exception.exceptions;


import com.ziglog.ziglog.domain.note.exception.NoteExceptionCode;

public class NoteNotFoundException extends RuntimeException{
    public NoteNotFoundException(){
        super( NoteExceptionCode.NOTE_NOT_FOUND_EXCEPTION.getErrorMessage());
    }

    public NoteNotFoundException(String message){
        super(message);
    }

}
