package com.ziglog.ziglog.domain.note.dto.response.folder;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RetrieveFolderOnlyResponseDto {
    List<FolderBriefDto> folderList;
}

