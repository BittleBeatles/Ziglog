package com.ziglog.ziglog.domain.note.exception.exceptions;


import com.ziglog.ziglog.domain.note.exception.NoteExceptionCode;

public class InconsistentNoteOwnerException extends RuntimeException{
    public InconsistentNoteOwnerException(){
        super( NoteExceptionCode.INCONSISTENT_NOTE_OWNER_EXCEPTION.getErrorMessage());
    }

    public InconsistentNoteOwnerException(String message){
        super(message);
    }

}
