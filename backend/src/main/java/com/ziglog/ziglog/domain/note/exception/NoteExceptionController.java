package com.ziglog.ziglog.domain.note.exception;

import com.ziglog.ziglog.domain.note.exception.exceptions.*;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.SizeLimitExceededException;

@RequiredArgsConstructor
@RestControllerAdvice("com.ziglog.ziglog")
public class NoteExceptionController {

    @ExceptionHandler(FolderNotFoundException.class)
    public ResponseDto<String> handleFolderNotFoundException (FolderNotFoundException err){
        return toResponseDto(NoteExceptionCode.FOLDER_NOT_FOUND_EXCEPTION);
    }

    @ExceptionHandler(NoteNotFoundException.class)
    public ResponseDto<String> handleNoteNotFoundException (NoteNotFoundException err){
        return toResponseDto(NoteExceptionCode.NOTE_NOT_FOUND_EXCEPTION);
    }

    @ExceptionHandler(InconsistentFolderOwnerException.class)
    public ResponseDto<String> handleInconsistentFolderOwnerException (InconsistentFolderOwnerException err){
        return toResponseDto(NoteExceptionCode.INCONSISTENT_FOLDER_OWNER_EXCEPTION);
    }

    @ExceptionHandler(InconsistentNoteOwnerException.class)
    public ResponseDto<String> handleInconsistentNoteOwnerException (InconsistentNoteOwnerException err){
        return toResponseDto(NoteExceptionCode.INCONSISTENT_NOTE_OWNER_EXCEPTION);
    }

    @ExceptionHandler(CannotRemoveRootFolderException.class)
    public ResponseDto<String> handleCannotRemoveRootFolderException (CannotRemoveRootFolderException err){
        return toResponseDto(NoteExceptionCode.CANNOT_REMOVE_ROOT_FOLDER_EXCEPTION);
    }

    @ExceptionHandler(NoAuthorizationToReadException.class)
    public ResponseDto<String> handleNoAuthorizationToReadException (NoAuthorizationToReadException err){
        return toResponseDto(NoteExceptionCode.NO_AUTHORIZATION_TO_READ_EXCEPTION);
    }

    @ExceptionHandler(SizeLimitExceededException.class)
    public ResponseDto<String> handleSizeLimitExceededException (SizeLimitExceededException err){
        return toResponseDto(NoteExceptionCode.SIZE_LIMIT_EXCEEDED_EXCEPTION);
    }

    public static ResponseDto<String> toResponseDto(NoteExceptionCode exceptionCode){
        return ResponseDto.of(exceptionCode.getErrorCode(), exceptionCode.getErrorMessage());
    }
}
