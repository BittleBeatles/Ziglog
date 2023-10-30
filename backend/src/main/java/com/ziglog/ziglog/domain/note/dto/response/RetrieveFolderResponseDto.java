package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Folder;
import lombok.Builder;

import java.util.List;

@Builder
public class RetrieveFolderResponseDto {

    private FolderDto folder;

    private RetrieveFolderResponseDto(FolderDto folderDto){
        this.folder = folderDto;
    }

    @Builder
    private static class FolderDto {
        private String type;
        private Long folderId;
        private String title;
        private List<NoteDto> notes;
        private List<RetrieveFolderResponseDto> folderList;
    }

    @Builder
    private static class NoteDto {
        private String type;
        private Long noteId;
        private String title;
        private Boolean isPublic;
    }

    public static RetrieveFolderResponseDto toDto(Folder folder){
        return new RetrieveFolderResponseDto(
                    FolderDto.builder()
                            .type("folder")
                            .folderId(folder.getId())
                            .title(folder.getTitle())
                            .notes(folder.getNotes().stream().map(note ->
                                NoteDto.builder()
                                        .type("note")
                                        .noteId(note.getId())
                                        .title(note.getTitle())
                                        .isPublic(note.isPublic())
                                        .build()).toList()
                            )
                            .folderList(folder.getChildren().stream().map(RetrieveFolderResponseDto::toDto).toList())
                            .build()
                );
    }
}
