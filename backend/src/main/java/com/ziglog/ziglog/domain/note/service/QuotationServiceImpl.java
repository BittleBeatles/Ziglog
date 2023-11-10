package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.dto.response.QuotingIdListResponseDto;
import com.ziglog.ziglog.domain.note.dto.request.quotation.UpdateQuotationsRequestDto;
import com.ziglog.ziglog.domain.note.dto.response.QuotationListResponseDto;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import com.ziglog.ziglog.domain.note.exception.exceptions.InconsistentNoteOwnerException;
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

    private final QuotationRepository quotationRepository;
    private final NoteRepository noteRepository;
    private final MemberRepository memberRepository;

    @Override
    public QuotationListResponseDto getQuotationLists(Long noteId) throws NoteNotFoundException {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        List<Note> quoted = getNotesQuotingThis(note);
        List<Note> quoting = getNotesQuotedByThis(note);

        return QuotationListResponseDto.toDto(quoted, quoting);
    }

    @Override
    public List<Note> getNotesQuotingThis(Note note) throws NoteNotFoundException {
        return note.getQuoted().stream().map(Quotation::getEndNote).toList();
    }

    @Override
    public List<Note> getNotesQuotedByThis(Note note) throws NoteNotFoundException {
        return note.getQuoting().stream().map(Quotation::getStartNote).toList();
    }

    @Override
    public List<Long> updateQuotations(Member member, Long noteId, UpdateQuotationsRequestDto requestDto)
            throws UserNotFoundException, NoteNotFoundException {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        if (!note.getAuthor().getId().equals(member.getId())) throw new InconsistentNoteOwnerException();

        List<Long> prevQuotingId = note.getQuoting().stream().map(quotation -> quotation.getStartNote().getId()).toList();
        List<Long> noteToNotify = requestDto.getQuotingIds().stream().filter(id -> !prevQuotingId.contains(id)).toList();

        quotationRepository.deleteQuotationsByIdIn(note.getQuoting().stream().map(Quotation::getId).toList());
        List<Quotation>  newQuotationList = requestDto.getQuotingIds().stream().map(id -> Quotation.builder()
                .startNote(Note.builder().id(id).build())
                .endNote(note)
                .owner(member)
                .build())
                .toList();

        quotationRepository.saveAll(newQuotationList);
        return noteToNotify;
    }

    @Override
    public QuotingIdListResponseDto getQuotingNoteIds(Long noteId) throws NoteNotFoundException {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        return QuotingIdListResponseDto.toDto(note.getQuoting().stream().map(Quotation::getStartNote).toList());
    }
}