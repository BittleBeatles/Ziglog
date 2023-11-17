package com.ziglog.ziglog.global.exception;

import com.ziglog.ziglog.global.util.dto.ResponseDto;
import jakarta.servlet.ServletException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.MethodNotAllowedException;

import java.io.IOException;

@RequiredArgsConstructor
@RestControllerAdvice("com.ziglog.ziglog")
public class CommonExceptionController {

    @ExceptionHandler(MethodNotAllowedException.class)
    public ResponseDto<String> handleMethodNotAllowedException (MethodNotAllowedException err){
        return toResponseDto(CommonExceptionCode.METHOD_NOT_ALLOWED_EXCEPTION);
    }

    @ExceptionHandler(ServletException.class)
    public ResponseDto<String> handleServletException (ServletException err){
        return toResponseDto(CommonExceptionCode.SERVLET_EXCEPTION);
    }

    @ExceptionHandler(HttpClientErrorException.BadRequest.class)
    public ResponseDto<String> handleBadRequestException (HttpClientErrorException.BadRequest err){
        return toResponseDto(CommonExceptionCode.BAD_REQUEST_EXCEPTION);
    }

    @ExceptionHandler(IOException.class)
    public ResponseDto<String> handleIoException (IOException err){
        return toResponseDto(CommonExceptionCode.IO_EXCEPTION);
    }
    @ExceptionHandler(RuntimeException.class)
    public ResponseDto<String> handleUnknownException (RuntimeException err){
        return toResponseDto(CommonExceptionCode.UNKNOWN_EXCEPTION);
    }

    public static ResponseDto<String> toResponseDto(CommonExceptionCode exceptionCode){
        return ResponseDto.of(exceptionCode.getErrorCode(), exceptionCode.getErrorMessage());
    }
}
