package com.ziglog.ziglog.domain.note.exception.exceptions;


import com.ziglog.ziglog.domain.note.exception.NoteExceptionCode;

public class InconsistentFolderOwnerException extends RuntimeException{
    public InconsistentFolderOwnerException(){
        super( NoteExceptionCode.INCONSISTENT_FOLDER_OWNER_EXCEPTION.getErrorMessage());
    }

    public InconsistentFolderOwnerException(String message){
        super(message);
    }

}
