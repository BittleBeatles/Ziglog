package com.ziglog.ziglog.global.exception.customException.note;


import com.ziglog.ziglog.global.exception.exceptionCode.NoteExceptionCode;

public class InconsistentNoteOwnerException extends RuntimeException{
    public InconsistentNoteOwnerException(){
        super( NoteExceptionCode.INCONSISTENT_NOTE_OWNER_EXCEPTION.getErrorMessage());
    }

    public InconsistentNoteOwnerException(String message){
        super(message);
    }

}
