package com.ziglog.ziglog.domain.note.dto.request;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class FolderAddRequestDTO {

    private String folderName;
    private Long parentId;

}
