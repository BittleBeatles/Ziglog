package com.ziglog.ziglog.domain.note.dto.request.note;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ChangeNoteParentRequestDto {
    private Long parentId;
    private Long childId;
}
