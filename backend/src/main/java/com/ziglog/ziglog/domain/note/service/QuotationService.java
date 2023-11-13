package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.note.dto.request.quotation.AddQuotationRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.quotation.DeleteQuotationRequestDto;
import com.ziglog.ziglog.domain.note.dto.response.note.QuotingIdListResponseDto;
import com.ziglog.ziglog.domain.note.dto.request.quotation.UpdateQuotationsRequestDto;
import com.ziglog.ziglog.domain.note.dto.response.note.QuotationListResponseDto;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.exception.exceptions.NoteNotFoundException;

import java.util.List;

public interface QuotationService {

    QuotationListResponseDto getQuotationLists(Long noteId) throws  NoteNotFoundException;
    // 인용
    List<Note> getNotesQuotingThis(Note note) throws NoteNotFoundException;
    List<Note> getNotesQuotedByThis(Note note) throws NoteNotFoundException;

    void addQuotation(Member member, AddQuotationRequestDto requestDto) throws NoteNotFoundException, UserNotFoundException;
    void deleteQuotation(Member member, DeleteQuotationRequestDto requestDto) throws NoteNotFoundException, UserNotFoundException;
    void updateQuotations(Member member, Long noteId, UpdateQuotationsRequestDto requestDto) throws UserNotFoundException, NoteNotFoundException;

    QuotingIdListResponseDto getQuotingNoteIds(Long noteId) throws NoteNotFoundException;
}
