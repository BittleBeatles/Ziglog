package com.ziglog.ziglog.domain.bookmark.exception;

import lombok.Getter;

@Getter
public enum BookmarkExceptionCode {
    BOOKMARK_NOT_FOUND_EXCEPTION(404, "해당하는 북마크를 찾을 수 없습니다"),
    BOOKMARK_ALREADY_EXISTS_EXCEPTION(400, "이미 추가된 북마크입니다.");

    private final Integer errorCode;
    private final String errorMessage;

    BookmarkExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
