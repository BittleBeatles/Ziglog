package com.ziglog.ziglog.domain.note.exception.exceptions;


import com.ziglog.ziglog.domain.note.exception.NoteExceptionCode;

public class CannotRemoveRootFolderException extends RuntimeException{
    public CannotRemoveRootFolderException(){
        super( NoteExceptionCode.INCONSISTENT_NOTE_OWNER_EXCEPTION.getErrorMessage());
    }

    public CannotRemoveRootFolderException(String message){
        super(message);
    }

}
