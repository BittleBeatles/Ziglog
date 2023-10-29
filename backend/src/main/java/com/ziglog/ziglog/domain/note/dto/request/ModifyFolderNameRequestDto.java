package com.ziglog.ziglog.domain.note.dto.request;

import com.ziglog.ziglog.domain.note.entity.Folder;

public class ModifyFolderNameRequestDto {
    private Long folderId;
    private String folderName;
    public Folder toEntity(){
        return Folder.builder()
                .id(folderId)
                .title(folderName)
                .build();
    }
}
