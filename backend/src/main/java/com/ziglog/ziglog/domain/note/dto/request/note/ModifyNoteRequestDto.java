package com.ziglog.ziglog.domain.note.dto.request.note;

import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

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
