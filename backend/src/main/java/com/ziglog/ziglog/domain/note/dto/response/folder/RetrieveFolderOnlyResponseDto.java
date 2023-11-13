package com.ziglog.ziglog.domain.note.dto.response.folder;

import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RetrieveFolderOnlyResponseDto {
    List<FolderBriefDto> folderList;
}

