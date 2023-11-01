package com.ziglog.ziglog.global.exception.customException.note;


import com.ziglog.ziglog.global.exception.exceptionCode.NoteExceptionCode;

public class FolderNotFoundException extends RuntimeException{
    public FolderNotFoundException(){
        super( NoteExceptionCode.FOLDER_NOT_FOUND_EXCEPTION.getErrorMessage());
    }

    public FolderNotFoundException(String message){
        super(message);
    }

}
