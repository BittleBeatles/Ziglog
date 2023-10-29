package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Builder;
import java.util.List;


@Builder
public class ReadNoteResponseDto {
    private Long noteId;
    private String title;
    private String content;
    private String nickname;
    private Boolean isPublic;
    private Integer bookmarkCount;

    public static ReadNoteResponseDto toDTO(Note note){
        List<BriefNoteResponseDto> quoted = note.getQuoted()
                                                 .stream().map(endNote->
                        BriefNoteResponseDto.toDTO(endNote.getEndNote())).toList();

        return ReadNoteResponseDto.builder()
                .noteId(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .nickname(note.getAuthor().getNickname())
                .isPublic(note.isPublic())
                .bookmarkCount(note.getBookmarks().size())
                .build();
    }
}
