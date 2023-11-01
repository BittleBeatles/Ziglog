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
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    public Note createNote(Member member, Long folderId) throws Exception {
        Member memberPersist = memberRepository.findByEmail(member.getEmail()).orElseThrow(Exception::new);
        Folder folderPersist = folderRepository.findById(folderId).orElseThrow(Exception::new);

        Note note = Note.builder()
                    .author(memberPersist)
                    .folder(folderPersist)
                    .build();

        note = noteRepository.save(note);
        folderPersist.getNotes().add(note);

        return note;
    }

    @Override
    public Note modifyNote(Member member, Note note) throws Exception {
        if (!checkOwner(member, note)) throw new Exception();

        Note notePersist = noteRepository.findNoteById(note.getId()).orElseThrow(Exception::new);
        notePersist.setTitle(note.getTitle());//타이틀
        notePersist.setContent(note.getContent());//컨텐츠
        notePersist.setPreview(note.getPreview());//목록 프리뷰
        notePersist.setEditDatetime(LocalDateTime.now());//수정일

        List<Quotation> noteQuoting = note.getQuoting(); //새 노트가 인용하고 있는 노트의 리스트
        List<Quotation> originQuoting = notePersist.getQuoting();

        quotationRepository.deleteQuotationsByIdIn(originQuoting.stream().map(Quotation::getId).toList());
        quotationRepository.saveAll(noteQuoting);
        notePersist.setQuoting(noteQuoting);

        return notePersist;
    }

    @Override
    public Note setPublic(Member member, Long noteId, Boolean isPublic) throws Exception {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(Exception::new);
        if (!checkOwner(member, note)) throw new Exception();

        note.setPublic(isPublic);

        if (note.isPublic() &&note.getPostDatetime() == null) {
            note.setPostDatetime(LocalDateTime.now());
        }

        return note;
    }

    @Override
    public void deleteNote(Member member, Long noteId) throws Exception {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(Exception::new);
        //삭제 요청자가 Security Context 내의 사용자 같은지 확인
        if (!checkOwner(member, note)) throw new Exception();

        //노트가 들어간 폴더에서 이 노트를 삭제
        note.getFolder().getNotes().remove(note);
        noteRepository.removeNoteById(noteId);
    }

    @Override
    public Note getNote(Long noteId) throws Exception{
        return noteRepository.findNoteById(noteId).orElseThrow(Exception::new);
    }

    // Folder
    @Override
    public Folder createFolder(Member member, String title, Long parentId) throws Exception{
        Folder parent = folderRepository.findById(parentId).orElseThrow(Exception::new);
        if (parent.getOwner() != member) throw new Exception();

        Folder folder = Folder.builder()
                        .title(title)
                        .parent(parent)
                        .owner(member)
                        .build();

        folder = folderRepository.save(folder);

        parent.getChildren().add(folder);
        member.getFolders().add(folder);

        return folder;
    }

    @Override
    public Folder modifyFolder(Member member, Folder folder) throws Exception {
        //JPA 영속성 컨테스트 내
        Folder origin = folderRepository.findById(folder.getId()).orElseThrow(Exception::new);
        if (!checkOwner(member, origin)) throw new Exception();

        origin.setTitle(folder.getTitle());
        return origin;
    }

    @Override
    public void deleteFolder(Member member, Long folderId) throws Exception {
        Folder folder= folderRepository.findById(folderId).orElseThrow(Exception::new);
        if (folder.getParent() == null) throw new Exception();
        if (!checkOwner(member, folder)) throw new Exception();

        Member memberPersist = memberRepository.findById(member.getId()).orElseThrow(Exception::new);
        memberPersist.getFolders().remove(folder);
        folderRepository.deleteById(folderId);
    }

    @Override
    public Folder getRootFolder(String nickname) throws Exception {
        Member user = memberRepository.findByNickname(nickname).orElseThrow(Exception::new);
        return folderRepository.findByOwnerAndParent(user, null).orElseThrow(Exception::new);
    }

    @Override
    public Boolean checkOwner(Member member, Note note){
        return note.getAuthor().getId().equals(member.getId());
    }

    @Override
    public Boolean checkOwner(Member member, Folder folder){
        return folder.getOwner().getId().equals(member.getId());
    }

    @Override
    public Slice<Note> searchPublicNotesByTitle(String keyword, Pageable pageable) throws Exception {
        return noteRepository.findAllByTitleContainingIgnoreCaseAndIsPublic(keyword, true, pageable);
    }
}
