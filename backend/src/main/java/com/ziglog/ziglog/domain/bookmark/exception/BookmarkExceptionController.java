package com.ziglog.ziglog.domain.bookmark.exception;

import com.ziglog.ziglog.domain.bookmark.exception.exceptions.BookmarkNotFoundException;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RequiredArgsConstructor
@RestControllerAdvice("com.ziglog.ziglog")
public class BookmarkExceptionController {

    @ExceptionHandler(BookmarkNotFoundException.class)
    public ResponseDto<String> handleBookmarkNotFoundException (BookmarkExceptionCode err){
        return toResponseDto(BookmarkExceptionCode.BOOKMARK_NOT_FOUND_EXCEPTION);
    }

    public static ResponseDto<String> toResponseDto(BookmarkExceptionCode exceptionCode){
        return ResponseDto.of(exceptionCode.getErrorCode(), exceptionCode.getErrorMessage());
    }
}
