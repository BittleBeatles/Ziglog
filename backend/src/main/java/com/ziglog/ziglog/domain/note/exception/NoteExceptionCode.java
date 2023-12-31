package com.ziglog.ziglog.domain.note.exception;

import lombok.Getter;

@Getter
public enum NoteExceptionCode {
    NOTE_NOT_FOUND_EXCEPTION(404, "해당 노트를 찾을 수 없습니다."),
    FOLDER_NOT_FOUND_EXCEPTION(404, "해당 폴더를 찾을 수 없습니다."),
    QUOTATION_NOT_FOUND_EXCEPTION(404, "해당 인용 관계를 찾을 수 없습니다"),
    INCONSISTENT_FOLDER_OWNER_EXCEPTION(403, "해당 폴더의 소유자가 아닙니다"),
    INCONSISTENT_NOTE_OWNER_EXCEPTION(403, "해당 노트의 소유자가 아닙니다"),
    CANNOT_REMOVE_ROOT_FOLDER_EXCEPTION(400, "사용자의 루트 폴더는 삭제할 수 없습니다"),
    NO_AUTHORIZATION_TO_READ_EXCEPTION(403, "해당 글을 읽을 권한이 없습니다"),
    SIZE_LIMIT_EXCEEDED_EXCEPTION(400, "허용된 크기 제한을 넘어섰습니다"),
    IllegalArgumentException(400, "잘못된 요청입니다.")
    ;

    private final Integer errorCode;
    private final String errorMessage;

    NoteExceptionCode(Integer errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
