package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.dto.request.quotation.AddQuotationRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.quotation.DeleteQuotationRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.quotation.UpdateQuotationsRequestDto;
import com.ziglog.ziglog.domain.note.dto.response.note.QuotationListResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.note.QuotingIdListResponseDto;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import com.ziglog.ziglog.domain.note.exception.exceptions.InconsistentNoteOwnerException;
import com.ziglog.ziglog.domain.note.exception.exceptions.NoteNotFoundException;
import com.ziglog.ziglog.domain.note.exception.exceptions.QuotationNotFoundException;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import com.ziglog.ziglog.domain.note.repository.QuotationRepository;
import com.ziglog.ziglog.domain.notification.dto.NotificationKafkaDto;
import com.ziglog.ziglog.domain.notification.entity.Notification;
import com.ziglog.ziglog.domain.notification.entity.NotificationType;
import com.ziglog.ziglog.domain.notification.repository.NotificationRdbRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class QuotationServiceImpl implements QuotationService {

    private final QuotationRepository quotationRepository;
    private final NoteRepository noteRepository;
    private final MemberRepository memberRepository;
    private final NotificationRdbRepository notificationRepository;
    private final KafkaTemplate<String, NotificationKafkaDto> kafkaTemplate;

    @Override
    public QuotationListResponseDto getQuotationLists(Long noteId) throws NoteNotFoundException {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        List<Note> quoted = getNotesQuotingThis(note);
        List<Note> quoting = getNotesQuotedByThis(note);

        return QuotationListResponseDto.toDto(quoting, quoted);
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
    public void updateQuotations(Member member, Long noteId, UpdateQuotationsRequestDto requestDto)
            throws UserNotFoundException, NoteNotFoundException {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        if (!note.getAuthor().getId().equals(member.getId())) throw new InconsistentNoteOwnerException();

        List<Long> prevQuotingId = note.getQuoting().stream().map(quotation -> quotation.getStartNote().getId()).toList();
        List<Long> noteToNotify = requestDto.getQuotingNoteIds().stream().filter(id -> !prevQuotingId.contains(id)).toList();

        quotationRepository.deleteQuotationsByIdIn(note.getQuoting().stream().map(Quotation::getId).toList());

        List<Quotation>  newQuotationList = requestDto.getQuotingNoteIds().stream().map(id -> Quotation.builder()
                .startNote(noteRepository.findNoteById(id).orElseThrow(NoteNotFoundException::new))
                .endNote(note)
                .owner(member)
                .build())
                .toList();

        quotationRepository.saveAll(newQuotationList);
        sendQuotationEvent(member, note, noteToNotify);
    }

    @Override
    public QuotingIdListResponseDto getQuotingNoteIds(Long noteId) throws NoteNotFoundException {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        return QuotingIdListResponseDto.toDto(note.getQuoting().stream().map(Quotation::getStartNote).toList());
    }

    private void sendQuotationEvent(Member sender, Note quoted, List<Long> newlyAddedQuotings) throws NoteNotFoundException{
        newlyAddedQuotings.forEach((noteId) -> {
            Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
            if (!note.getAuthor().getId().equals(sender.getId())){//본인의 노트가 아닌 경우

                String id = sender.getId() + "_" + note.getAuthor().getId() + "_" + UUID.randomUUID();

                Notification notification = Notification.builder()
                        .id(id)
                        .type(NotificationType.QUOTE)
                        .receiver(note.getAuthor())
                        .sender(sender)
                        .note(quoted)
                        .title(quoted.getTitle())
                        .isRead(false)
                        .build();

                kafkaTemplate.send("sse", NotificationKafkaDto.toDto(notification));
            }
        });
    }

    @Override
    public void addQuotation(Member member, AddQuotationRequestDto requestDto) throws NoteNotFoundException, UserNotFoundException{
        Member memberPersist = memberRepository.findById(member.getId()).orElseThrow(UserNotFoundException::new);
        Note startNote = noteRepository.findNoteById(requestDto.getStartNoteIdx()).orElseThrow(NoteNotFoundException::new);
        Note endNote = noteRepository.findNoteById(requestDto.getEndNoteIdx()).orElseThrow(NoteNotFoundException::new);

        Quotation quotation = quotationRepository.findByStartNoteAndEndNoteAndOwner(startNote, endNote, memberPersist).orElse(null);
        if (quotation != null) return;

        Quotation newQuotation = Quotation.builder()
                                    .owner(memberPersist)
                                    .startNote(startNote)
                                    .endNote(endNote)
                                .build();
        quotationRepository.save(newQuotation);
    }


    @Override
    public void deleteQuotation(Member member, DeleteQuotationRequestDto requestDto) throws UserNotFoundException, NoteNotFoundException, QuotationNotFoundException{
        Member memberPersist = memberRepository.findById(member.getId()).orElseThrow(UserNotFoundException::new);
        Note startNote = noteRepository.findNoteById(requestDto.getStartNoteIdx()).orElseThrow(NoteNotFoundException::new);
        Note endNote = noteRepository.findNoteById(requestDto.getEndNoteIdx()).orElseThrow(NoteNotFoundException::new);

        Quotation quotation = quotationRepository.findByStartNoteAndEndNoteAndOwner(startNote, endNote, memberPersist)
                                                .orElseThrow(QuotationNotFoundException::new);
        quotationRepository.delete(quotation);
    }
}
