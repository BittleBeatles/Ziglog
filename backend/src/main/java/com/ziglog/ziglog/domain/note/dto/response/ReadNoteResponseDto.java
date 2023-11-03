package com.ziglog.ziglog.domain.note.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;


@Builder
@Getter
public class ReadNoteResponseDto {
    private Long noteId;
    private String title;
    private String content;
    private String nickname;
    private Boolean isPublic;
    private Integer bookmarkCount;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime postTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime editTime;

    public static ReadNoteResponseDto toDto(Note note){
        return ReadNoteResponseDto.builder()
                .noteId(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .nickname(note.getAuthor().getNickname())
                .isPublic(note.isPublic())
                .bookmarkCount(note.getBookmarks().size())
                .postTime(note.getPostDatetime())
                .editTime(note.getEditDatetime())
                .build();
    }
}
