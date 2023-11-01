package com.ziglog.ziglog.global.exception.customException.note;


import com.ziglog.ziglog.global.exception.exceptionCode.NoteExceptionCode;

public class InconsistentFolderOwnerException extends RuntimeException{
    public InconsistentFolderOwnerException(){
        super( NoteExceptionCode.INCONSISTENT_FOLDER_OWNER_EXCEPTION.getErrorMessage());
    }

    public InconsistentFolderOwnerException(String message){
        super(message);
    }

}
