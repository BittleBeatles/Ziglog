package com.ziglog.ziglog.domain.note.exception.exceptions;


import com.ziglog.ziglog.domain.note.exception.NoteExceptionCode;

public class QuotationNotFoundException extends RuntimeException{
    public QuotationNotFoundException(){
        super( NoteExceptionCode.QUOTATION_NOT_FOUND_EXCEPTION.getErrorMessage());
    }

    public QuotationNotFoundException(String message){
        super(message);
    }

}
