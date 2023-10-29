package com.ziglog.ziglog.domain.note.dto.request;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Getter;

@Getter
public class CreateNoteRequestDto {
    private Long folderId;
}
