package com.ziglog.ziglog.domain.note.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateNoteRequestDto {
    private Long folderId;
}
