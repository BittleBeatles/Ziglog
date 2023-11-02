package com.ziglog.ziglog.domain.note.dto.request.folder;

import com.ziglog.ziglog.domain.note.entity.Folder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CreateFolderRequestDto {
    private String folderName;
    private Long parentId;
}
