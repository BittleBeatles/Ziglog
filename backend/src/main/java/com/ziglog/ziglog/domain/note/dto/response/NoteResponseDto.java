package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Builder;
import java.util.List;


@Builder
public class NoteResponseDto {
    private Long noteId;
    private String title;
    private String content;
    private String nickname;
    private Boolean isPublic;
    private Integer bookmarkCount;
    private List<BriefNoteResponseDto> quotedList;


    //postDateTime이랑 editDateTime도 추가돼야 하는데 어떻게 할지 모르곘네요

    public static NoteResponseDto toDTO(Note note){
        List<BriefNoteResponseDto> quoted = note.getQuoted()
                                                 .stream().map(endNote->
                        BriefNoteResponseDto.toDTO(endNote.getEndNote())).toList();

        return NoteResponseDto.builder()
                .noteId(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .nickname(note.getAuthor().getNickname())
                .isPublic(note.isPublic())
                .bookmarkCount(note.getBookmarks().size())
                .quotedList(quoted)
                .build();
    }
}
