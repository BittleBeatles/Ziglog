package com.ziglog.ziglog.domain.note.dto.request.folder;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ChangeFolderParentRequestDto {
    private Long parentId;
    private Long childId;
}
