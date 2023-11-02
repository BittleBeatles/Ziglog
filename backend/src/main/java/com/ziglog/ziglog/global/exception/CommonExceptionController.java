package com.ziglog.ziglog.global.exception;

import com.ziglog.ziglog.global.exception.exceptions.BadRequestException;
import com.ziglog.ziglog.global.exception.exceptions.MethodNotFoundException;
import com.ziglog.ziglog.global.exception.exceptions.UnknownException;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RequiredArgsConstructor
@RestControllerAdvice("com.ziglog.ziglog")
public class CommonExceptionController {

    @ExceptionHandler(UnknownException.class)
    public ResponseDto<String> handleUnknownException (UnknownException err){
        return toResponseDto(CommonExceptionCode.UNKNOWN_EXCEPTION);
    }

    @ExceptionHandler(MethodNotFoundException.class)
    public ResponseDto<String> handleMethodNotFoundException (MethodNotFoundException err){
        return toResponseDto(CommonExceptionCode.METHOD_NOT_FOUND_EXCEPTION);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseDto<String> handleBadRequestException (BadRequestException err){
        return toResponseDto(CommonExceptionCode.BAD_REQUEST_EXCEPTION);
    }

    public static ResponseDto<String> toResponseDto(CommonExceptionCode exceptionCode){
        return ResponseDto.of(exceptionCode.getErrorCode(), exceptionCode.getErrorMessage());
    }
}
