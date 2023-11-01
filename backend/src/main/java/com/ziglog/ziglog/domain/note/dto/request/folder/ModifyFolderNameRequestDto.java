package com.ziglog.ziglog.domain.note.dto.request.folder;

import com.ziglog.ziglog.domain.note.entity.Folder;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
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
