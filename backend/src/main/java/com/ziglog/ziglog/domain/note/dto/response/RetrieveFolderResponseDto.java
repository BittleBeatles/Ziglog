package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Builder;
import lombok.Getter;

import java.util.Comparator;
import java.util.List;

@Builder
@Getter
public class RetrieveFolderResponseDto {

    private FolderDto folder;

    private RetrieveFolderResponseDto(FolderDto folderDto){
        this.folder = folderDto;
    }

    @Builder
    @Getter
    private static class FolderDto {
        private String type;
        private Long folderId;
        private String title;
        private List<NoteDto> notes;
        private List<RetrieveFolderResponseDto> folderList;
    }

    @Builder
    @Getter
    private static class NoteDto {
        private String type;
        private Long noteId;
        private String title;
        private Boolean isPublic;
    }

    public static RetrieveFolderResponseDto toDto(Folder folder, Member member){
        return new RetrieveFolderResponseDto(
                    FolderDto.builder()
                            .type("folder")
                            .folderId(folder.getId())
                            .title(folder.getTitle())
                            .notes(folder.getNotes().stream().sorted(Comparator.comparing(Note::getTitle))
                                            .filter(note -> note.isPublic() || note.getAuthor().equals(member))
                                            .map(note ->
                                                NoteDto.builder()
                                                        .type("note")
                                                        .noteId(note.getId())
                                                        .title(note.getTitle())
                                                        .isPublic(note.isPublic())
                                                        .build()
                                            ).toList()//이름으로 오름차순 정렬
                            )
                            .folderList(folder.getChildren().stream().sorted(Comparator.comparing(Folder::getTitle))
                                    .map((Folder folder1) -> toDto(folder1, member))
                                    .toList())//이름으로 오름차순 정렬해서 주기
                            .build()
                );
    }
}
