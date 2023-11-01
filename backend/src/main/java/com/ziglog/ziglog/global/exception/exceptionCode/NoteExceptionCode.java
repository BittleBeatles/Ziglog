package com.ziglog.ziglog.global.exception.exceptionCode;

import lombok.Getter;

@Getter
public enum NoteExceptionCode {
    NO_NOTE_FOUND_WITH_ID_EXCEPTION(404, "해당 아이디의 노트를 찾을 수 없습니다."),
    NO_FOLDER_FOUND_WITH_ID_EXCEPTION(404, "해당 아이디의 폴더를 찾을 수 없습니다."),
    INCONSISTENT_FOLDER_OWNER_EXCEPTION(403, "해당 폴더의 소유자가 아닙니다"),
    INCONSISTENT_NOTE_OWNER_EXCEPTION(403, "해당 노트의 소유자가 아닙니다")
    ;

    private final Integer errorCode;
    private final String errorMessage;

    NoteExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
