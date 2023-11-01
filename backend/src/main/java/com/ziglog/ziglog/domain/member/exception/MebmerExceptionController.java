package com.ziglog.ziglog.domain.member.exception;

import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RequiredArgsConstructor
@RestControllerAdvice("com.ziglog.ziglog")
public class MebmerExceptionController {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseDto<String> handleUserNotFoundException (UserNotFoundException err){
        return toResponseDto(MemberExceptionCode.USER_NOT_FOUND_EXCEPTION);
    }

    public static ResponseDto<String> toResponseDto(MemberExceptionCode exceptionCode){
        return ResponseDto.of(exceptionCode.getErrorCode(), exceptionCode.getErrorMessage());
    }
}
