package com.ziglog.ziglog.domain.note.dto.request;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;

import java.util.List;

public class ModifyNoteRequestDto {
    private String title;
    private String content;
    private List<Long> quotingNotes;

    public Note toEntity(Member member, Long noteId){
        List<Quotation> quotations = quotingNotes.stream()
                .map(quoting -> Quotation.builder().startNote(new Note(noteId))
                        .endNote(new Note(quoting))
                        .build()).toList();

        return Note.builder()
                .id(noteId)
                .title(title)
                .content(content)
                .author(member)
                .quoting(quotations)
                .build();
    }

}
