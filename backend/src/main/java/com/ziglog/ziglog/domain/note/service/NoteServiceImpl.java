package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import com.ziglog.ziglog.domain.note.repository.FolderRepository;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import com.ziglog.ziglog.domain.note.repository.QuotationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class NoteServiceImpl implements NoteService{

    private final MemberRepository memberRepository;
    private final FolderRepository folderRepository;
    private final NoteRepository noteRepository;
    private final QuotationRepository quotationRepository;

    //Note
    @Override
    public Note createNote() {

        Member member = new Member();//SecurityContext 내의 사용자로 변할 것

        Note note = Note.builder()
                    .author(member)
                    .build();
        return noteRepository.save(note);
    }

    @Override
    public Note saveNoteWithDiff(Note note) throws Exception {

        //글의 저자가 Security Context 내의 유저와 같은지 확인

        //영속성 Context 내의 노트
        Note origin = noteRepository.findNoteById(note.getId()).orElseThrow(() -> new Exception());
        origin.setTitle(note.getTitle());//타이틀
        origin.setContent(note.getContent());//컨텐츠
        origin.setBrief(note.getBrief());//목록 프리뷰
        origin.setEditDatetime(LocalDateTime.now());//수정일

        return origin;
    }

    @Override
    public Note setPublic(Note note) throws Exception {
        Note origin = noteRepository.findNoteById(note.getId()).orElseThrow(() -> new Exception());

        origin.setPublic(note.isPublic());
        if (origin.isPublic() && origin.getPostDatetime() == null) {
            origin.setPostDatetime(LocalDateTime.now());
        }

        return origin;
    }

    @Override
    public Boolean deleteNote(Long noteId) {

        //삭제 요청자가 Security Context 내의 사용자 같은지 확인
        try {
            noteRepository.removeNoteById(noteId);
        }
        catch (Exception e){
            return false;
        }
        return true;
    }

    @Override
    public Note getNote(Long noteId) throws Exception{
        return noteRepository.findNoteById(noteId).orElseThrow(() -> new Exception());
    }

    @Override
    public List<Note> findNotesQuotingThisNote(Long noteId) {
        return null;
    }

    // Folder
    @Override
    public Folder addFolder(Folder folder) {
        return folderRepository.save(folder);
    }

    @Override
    public Folder modifyFolder(Folder folder) throws Exception {

        //JPA 영속성 컨테스트 내
        Folder origin = folderRepository.findById(folder.getId()).orElseThrow(() -> new Exception());
        origin.setTitle(folder.getTitle());

        return null;
    }

    @Override
    public Boolean deleteFolder(Long folderId) {

        try {
            folderRepository.deleteById(folderId);
        }
        catch (Exception e) {
            return false;
        }

        return true;
    }

    @Override
    public List<Folder> listFolder(String nickname) throws Exception {
        Member user = memberRepository.findMemberByNickname(nickname).orElseThrow(() -> new Exception());
        return folderRepository.findAllByOwner(user);
    }

    // Quotation
    @Override
    public Boolean addQuotation(Long fromNote, Long toNote) throws Exception{
        Note from = noteRepository.findNoteById(fromNote).orElseThrow(() -> new Exception() );
        Note to = noteRepository.findNoteById(toNote).orElseThrow(() -> new Exception());

        Quotation quotation = Quotation.builder()
                                .startNote(from)
                                .endNote(to)
                                .build();

        try {
            quotationRepository.save(quotation);
        }catch (Exception e){
            return false;
        }
        return true;
    }

    @Override
    public Boolean deleteQuotation(Long fromNote, Long toNote) throws Exception {
        Note from = noteRepository.findNoteById(fromNote).orElseThrow(() -> new Exception() );
        Note to = noteRepository.findNoteById(toNote).orElseThrow(() -> new Exception());

        Quotation quotation = quotationRepository.findByStartNoteAndEndNote(from, to);
        quotationRepository.deleteQuotationById(quotation.getId());
        return false;
    }
}
