package com.ziglog.ziglog.domain.member.exception;

import lombok.Getter;

@Getter
public enum MemberExceptionCode {
    USER_NOT_FOUND_EXCEPTION(404, "해당하는 사용자를 찾을 수 없습니다."),
    INVALID_USER_MODIFICATION_REQUEST_EXCEPTION(400, "해당 정보로 사용자 정보를 수정할 수 없습니다")
    ;

    private final Integer errorCode;
    private final String errorMessage;

    MemberExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
