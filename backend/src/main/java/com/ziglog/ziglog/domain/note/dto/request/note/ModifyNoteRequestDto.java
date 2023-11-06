package com.ziglog.ziglog.domain.note.dto.request.note;

import com.ziglog.ziglog.domain.member.entity.Member;
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
    private List<Long> quotingNotes;

    public Note toEntity(Long noteId){
        List<Quotation> quotations = quotingNotes.stream()
                .map(quoting -> Quotation.builder().startNote(new Note(quoting))
                        .endNote(new Note(noteId))
                        .build()).toList();

        return Note.builder()
                .id(noteId)
                .title(title)
                .content(content)
                .quoting(quotations)
                .build();
    }
}
