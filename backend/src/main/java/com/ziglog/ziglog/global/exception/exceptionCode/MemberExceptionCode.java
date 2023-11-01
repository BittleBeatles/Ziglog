package com.ziglog.ziglog.global.exception.exceptionCode;

import lombok.Getter;

@Getter
public enum MemberExceptionCode {
    USER_NOT_FOUND_EXCEPTION(404, "해당하는 사용자를 찾을 수 없습니다.")
    ;

    private final Integer errorCode;
    private final String errorMessage;

    MemberExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
