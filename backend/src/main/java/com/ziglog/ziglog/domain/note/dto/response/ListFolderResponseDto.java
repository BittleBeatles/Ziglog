package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Folder;
import lombok.Builder;

import java.util.List;

@Builder
public class ListFolderResponseDto {

    private List<FolderDto> folderList;

    private ListFolderResponseDto(List<FolderDto> folderDtos){
        this.folderList = folderDtos;
    }

    @Builder
    private class FolderDto {
        private String type;
        private Long folderId;
        private String title;
        private List<NoteDto> notes;
    }

    @Builder
    private class NoteDto {
        private String type;
        private Long noteId;
        private String title;
        private Boolean isPublic;
    }

    public static ListFolderResponseDto toDto(List<Folder> folderList, Member member){
        return new ListFolderResponseDto(
                folderList.stream().map(folder ->
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
                            .build()
                ).toList()
        );
    }
}
