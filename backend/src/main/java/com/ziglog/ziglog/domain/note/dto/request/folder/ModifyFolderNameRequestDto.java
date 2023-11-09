package com.ziglog.ziglog.domain.note.dto.request.folder;

import com.ziglog.ziglog.domain.note.entity.Folder;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ModifyFolderNameRequestDto {
    private String folderName;
    private Long folderId;
}
