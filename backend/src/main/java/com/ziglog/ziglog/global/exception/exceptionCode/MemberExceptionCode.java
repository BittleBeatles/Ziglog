package com.ziglog.ziglog.global.exception.exceptionCode;

import lombok.Getter;

@Getter
public enum MemberExceptionCode {
    NOT_FOUND_WITH_NICKNAME_EXCEPTION(404, "해당 닉네임의 사용자를 찾을 수 없습니다."),
    NOT_FOUND_WITH_EMAIL_EXCEPTION(404, "해당 이메일의 사용자를 찾을 수 없습니다.")
    ;

    private final Integer errorCode;
    private final String errorMessage;

    MemberExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
