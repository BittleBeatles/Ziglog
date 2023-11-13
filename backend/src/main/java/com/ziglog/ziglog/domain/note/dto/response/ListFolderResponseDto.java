package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Folder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ListFolderResponseDto {
    private List<FolderDto> folderList;

    @Builder
    @Getter
    private static class FolderDto{
        private Long folderId;
        private String folderTitle;
    }

    public static ListFolderResponseDto toDto(List<Folder> folders) {
        return new ListFolderResponseDto(
                folders.stream().map(folder -> FolderDto.builder().folderId(folder.getId()).folderTitle(folder.getTitle()).build())
                .toList());

    }

}
