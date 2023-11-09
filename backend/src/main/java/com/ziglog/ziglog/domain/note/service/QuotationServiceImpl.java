package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import com.ziglog.ziglog.domain.note.exception.exceptions.NoteNotFoundException;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import com.ziglog.ziglog.domain.note.repository.QuotationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class QuotationServiceImpl implements QuotationService {

    private QuotationRepository quotationRepository;
    private NoteRepository noteRepository;

    @Override
    public List<Note> getNotesQuotingThis(Long noteId) throws NoteNotFoundException {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        return note.getQuoted().stream().map(Quotation::getEndNote).toList();
    }

    @Override
    public void addQuotation(Member member, Long startNoteId, Long endNoteId) {


    }

    @Override
    public void deleteQuotation(Member member, Long startNoteId, Long endNoteId) {

    }

    @Override
    public void updateQuotations(Member member, Note note, List<Long> quotationsToAdd) {

    }




}
