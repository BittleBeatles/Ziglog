package com.ziglog.ziglog.domain.note.dto.request.note;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ModifyNoteRequestDto {
    private String title;
    private String content;

    public Note toEntity(Long noteId){
        return Note.builder()
                .id(noteId)
                .title(title)
                .content(content)
                .build();
    }
}
