package com.ziglog.ziglog.domain.bookmark.exception.exceptions;

import com.ziglog.ziglog.domain.bookmark.exception.BookmarkExceptionCode;

public class BookmarkAlreadyExistsException extends RuntimeException {
    public BookmarkAlreadyExistsException(){
        super(BookmarkExceptionCode.BOOKMARK_ALREADY_EXISTS_EXCEPTION.getErrorMessage());
    }
    public BookmarkAlreadyExistsException(String message){
        super(message);
    }
}
