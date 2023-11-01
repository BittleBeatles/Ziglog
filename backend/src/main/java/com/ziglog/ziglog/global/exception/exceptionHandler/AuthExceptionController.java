package com.ziglog.ziglog.global.exception.exceptionHandler;

import com.ziglog.ziglog.global.exception.customException.auth.InvalidAccessTokenException;
import com.ziglog.ziglog.global.exception.customException.auth.InvalidRefreshTokenException;
import com.ziglog.ziglog.global.exception.exceptionCode.AuthExceptionCode;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController("com.ziglog.ziglog")
public class AuthExceptionController {

    @ExceptionHandler(InvalidAccessTokenException.class)
    public ResponseDto<String> handleInvalidAccessTokenException (InvalidAccessTokenException err){
        return toResponseDto(AuthExceptionCode.INVALID_ACCESS_TOKEN_EXCEPTION);
    }

    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseDto<String> handleInvalidRefreshTokenException (InvalidRefreshTokenException err){
        return toResponseDto(AuthExceptionCode.INVALID_REFRESH_TOKEN_EXCEPTION);
    }
    public static ResponseDto<String> toResponseDto(AuthExceptionCode authExceptionCode){
        return ResponseDto.of(authExceptionCode.getErrorCode(), authExceptionCode.getErrorMessage());
    }

}
