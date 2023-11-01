package com.ziglog.ziglog.global.exception.customException.bookmark;

import com.ziglog.ziglog.global.exception.exceptionCode.BookmarkExceptionCode;

public class BookmarkNotFoundException extends RuntimeException {
    public BookmarkNotFoundException(){
        super(BookmarkExceptionCode.BOOKMARK_NOT_FOUND_EXCEPTION.getErrorMessage());
    }
    public BookmarkNotFoundException(String message){
        super(message);
    }
}
