package com.ziglog.ziglog.global.exception.exceptionHandler;

import com.ziglog.ziglog.global.exception.customException.common.BadRequestException;
import com.ziglog.ziglog.global.exception.customException.common.MethodNotFoundException;
import com.ziglog.ziglog.global.exception.customException.common.UnknownException;
import com.ziglog.ziglog.global.exception.customException.note.FolderNotFoundException;
import com.ziglog.ziglog.global.exception.customException.note.InconsistentFolderOwnerException;
import com.ziglog.ziglog.global.exception.customException.note.InconsistentNoteOwnerException;
import com.ziglog.ziglog.global.exception.customException.note.NoteNotFoundException;
import com.ziglog.ziglog.global.exception.exceptionCode.CommonExceptionCode;
import com.ziglog.ziglog.global.exception.exceptionCode.NoteExceptionCode;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController("com.ziglog.ziglog")
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

    public static ResponseDto<String> toResponseDto(NoteExceptionCode exceptionCode){
        return ResponseDto.of(exceptionCode.getErrorCode(), exceptionCode.getErrorMessage());
    }
}
