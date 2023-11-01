package com.ziglog.ziglog.domain.bookmark.exception.exceptions;

import com.ziglog.ziglog.domain.bookmark.exception.BookmarkExceptionCode;

public class BookmarkNotFoundException extends RuntimeException {
    public BookmarkNotFoundException(){
        super(BookmarkExceptionCode.BOOKMARK_NOT_FOUND_EXCEPTION.getErrorMessage());
    }
    public BookmarkNotFoundException(String message){
        super(message);
    }
}
