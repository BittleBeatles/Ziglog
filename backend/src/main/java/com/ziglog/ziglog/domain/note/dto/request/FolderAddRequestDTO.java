package com.ziglog.ziglog.domain.note.dto.request;

import com.ziglog.ziglog.domain.note.entity.Folder;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class FolderAddRequestDTO {

    private String folderName;
    private Long parentId;

    public Folder toEntity(){
        return Folder.builder()
                .id(parentId)
                .title(folderName)
                .build();
    }


}
