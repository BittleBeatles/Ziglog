package com.ziglog.ziglog.domain.note.dto.request.note;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateNoteRequestDto {
    private Long folderId;
}
