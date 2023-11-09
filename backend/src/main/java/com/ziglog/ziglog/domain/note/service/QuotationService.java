package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.exception.exceptions.NoteNotFoundException;

import java.util.List;

public interface QuotationService {
    // 인용
    List<Note> getNotesQuotingThis(Long noteId) throws NoteNotFoundException;
    void addQuotation(Member member, Long startNoteId, Long endNoteId);
    void deleteQuotation(Member member, Long startNoteId, Long endNoteId);
    void updateQuotations(Member member, Note note, List<Long> quotationsToAdd);

}
