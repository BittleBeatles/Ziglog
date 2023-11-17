package com.ziglog.ziglog.domain.note.exception.exceptions;


import com.ziglog.ziglog.domain.note.exception.NoteExceptionCode;

public class FolderNotFoundException extends RuntimeException{
    public FolderNotFoundException(){
        super( NoteExceptionCode.FOLDER_NOT_FOUND_EXCEPTION.getErrorMessage());
    }

    public FolderNotFoundException(String message){
        super(message);
    }

}
