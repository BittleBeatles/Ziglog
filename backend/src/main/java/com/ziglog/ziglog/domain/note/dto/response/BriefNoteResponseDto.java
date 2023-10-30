package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class BriefNoteResponseDto {

    private Long noteId;
    private String title;
    private String nickname;
    private String brief;

    public static BriefNoteResponseDto toDTO(Note note){
        return BriefNoteResponseDto.builder()
                .noteId(note.getId())
                .title(note.getTitle())
                .nickname(note.getAuthor().getNickname())
                .brief(note.getBrief())
                .build();
    }
}
