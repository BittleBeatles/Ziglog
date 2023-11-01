package com.ziglog.ziglog.global.exception.exceptionCode;

import lombok.Getter;

@Getter
public enum NoteExceptionCode {
    NOTE_NOT_FOUND_EXCEPTION(404, "해당 노트를 찾을 수 없습니다."),
    FOLDER_NOT_FOUND_EXCEPTION(404, "해당 폴더를 찾을 수 없습니다."),
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
