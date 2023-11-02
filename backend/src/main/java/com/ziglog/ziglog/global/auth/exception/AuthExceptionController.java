package com.ziglog.ziglog.global.auth.exception;

import com.ziglog.ziglog.global.auth.exception.exceptions.InvalidAccessTokenException;
import com.ziglog.ziglog.global.auth.exception.exceptions.InvalidRefreshTokenException;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RequiredArgsConstructor
@RestControllerAdvice("com.ziglog.ziglog")
public class AuthExceptionController {

    @ExceptionHandler(InvalidAccessTokenException.class)
    public ResponseDto<String> handleInvalidAccessTokenException (InvalidAccessTokenException err){
        return toResponseDto(AuthExceptionCode.INVALID_ACCESS_TOKEN_EXCEPTION);
    }

    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseDto<String> handleInvalidRefreshTokenException (InvalidRefreshTokenException err){
        return toResponseDto(AuthExceptionCode.INVALID_REFRESH_TOKEN_EXCEPTION);
    }
    public static ResponseDto<String> toResponseDto(AuthExceptionCode exceptionCode){
        return ResponseDto.of(exceptionCode.getErrorCode(), exceptionCode.getErrorMessage());
    }

}
