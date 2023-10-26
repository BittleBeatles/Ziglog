package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BriefNoteResponseDTO {

    private Long noteId;
    private String title;
    private String nickname;
    private String brief;

    public static BriefNoteResponseDTO toDTO(Note note){
        return BriefNoteResponseDTO.builder()
                .noteId(note.getId())
                .title(note.getTitle())
                .nickname(note.getAuthor().getNickname())
                .brief(note.getBrief())
                .build();
    }
}
