package com.ziglog.ziglog.domain.note.dto.request.folder;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CreateFolderRequestDto {
    private String folderName;
    private Long parentId;
}
