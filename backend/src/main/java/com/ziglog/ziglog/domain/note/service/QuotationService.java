package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.dto.response.QuotingIdListResponseDto;
import com.ziglog.ziglog.domain.note.dto.request.quotation.UpdateQuotationsRequestDto;
import com.ziglog.ziglog.domain.note.dto.response.QuotationListResponseDto;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.exception.exceptions.NoteNotFoundException;

import java.util.List;

public interface QuotationService {

    QuotationListResponseDto getQuotationLists(Long noteId) throws  NoteNotFoundException;
    // 인용
    List<Note> getNotesQuotingThis(Note note) throws NoteNotFoundException;
    List<Note> getNotesQuotedByThis(Note note) throws NoteNotFoundException;
    List<Long> updateQuotations(Member member, Long noteId, UpdateQuotationsRequestDto requestDto);

    QuotingIdListResponseDto getQuotingNoteIds(Long noteId) throws NoteNotFoundException;
}
