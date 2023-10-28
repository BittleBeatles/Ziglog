package com.ziglog.ziglog.domain.note.dto.request;

import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class NoteSaveRequestDto {
    private Long noteId;
    private String title;
    private Boolean isPublic;
    private String content;
    private List<Long> quotingNotes;

    public Note toEntity(){
        List<Quotation> quotations = quotingNotes.stream()
                .map(quoting -> Quotation.builder().startNote(new Note(noteId))
                        .endNote(new Note(quoting))
                        .build()).toList();

        return Note.builder()
                .id(noteId)
                .title(title)
                .isPublic(isPublic)
                .content(content)
                .quoting(quotations)
                .build();
    }
}
