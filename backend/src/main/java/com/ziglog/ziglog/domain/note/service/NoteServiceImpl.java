package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import com.ziglog.ziglog.domain.note.exception.exceptions.*;
import com.ziglog.ziglog.domain.note.repository.FolderRepository;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import com.ziglog.ziglog.domain.note.repository.QuotationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
@Slf4j
public class NoteServiceImpl implements NoteService{

    private final MemberRepository memberRepository;
    private final FolderRepository folderRepository;
    private final NoteRepository noteRepository;
    private final QuotationRepository quotationRepository;

    //Note
    @Override
    public Note createNote(Member member, Long folderId) throws UserNotFoundException, FolderNotFoundException, InconsistentFolderOwnerException{
        Member memberPersist = memberRepository.findByEmail(member.getEmail()).orElseThrow(UserNotFoundException::new);
        Folder folderPersist = folderRepository.findById(folderId).orElseThrow(FolderNotFoundException::new);

        checkOwner(memberPersist, folderPersist);
        Note note = Note.builder()
                    .author(memberPersist)
                    .title("글 제목")
                    .folder(folderPersist)
                    .build();

        note = noteRepository.save(note);
        folderPersist.getNotes().add(note);

        return note;
    }

    @Override
    public Note modifyNote(Member member, Note note) throws NoteNotFoundException, InconsistentFolderOwnerException {
        Note notePersist = noteRepository.findNoteById(note.getId()).orElseThrow(NoteNotFoundException::new);
        checkOwner(member, notePersist);

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
    public Note setPublic(Member member, Long noteId, Boolean isPublic) throws InconsistentFolderOwnerException, NoteNotFoundException{
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        checkOwner(member, note);

        note.setPublic(isPublic);

        if (note.isPublic() &&note.getPostDatetime() == null) {
            note.setPostDatetime(LocalDateTime.now());
        }

        return note;
    }

    @Override
    public void deleteNote(Member member, Long noteId) throws InconsistentNoteOwnerException, NoteNotFoundException {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        //삭제 요청자가 Security Context 내의 사용자 같은지 확인
        checkOwner(member, note);

        //노트가 들어간 폴더에서 이 노트를 삭제
        note.getFolder().getNotes().remove(note);
        noteRepository.removeNoteById(noteId);
    }

    @Override
    public Note readNote(Member member, Long noteId) throws NoteNotFoundException, NoAuthorizationToReadException {
        Note note =  noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        if (note.isPublic()) return note;
        if (member == null) throw new NoAuthorizationToReadException();
        if (!note.getAuthor().getId().equals(member.getId())) throw new NoAuthorizationToReadException();
        return note;
    }

    // Folder
    @Override
    public Folder createFolder(Member member, String title, Long parentId) throws FolderNotFoundException, InconsistentNoteOwnerException, UserNotFoundException {
        log.info("parentId : {}", parentId);
        Folder parent = folderRepository.findById(parentId).orElseThrow(FolderNotFoundException::new);
        checkOwner(member, parent);

        Folder folder = Folder.builder()
                        .title(title)
                        .parent(parent) .owner(member) .build();

        folder = folderRepository.save(folder);

        parent.getChildren().add(folder);
        memberRepository.findByEmail(member.getEmail()).orElseThrow(UserNotFoundException::new).getFolders().add(folder);

        return folder;
    }

    @Override
    public Folder modifyFolder(Member member, Folder folder) throws InconsistentFolderOwnerException, FolderNotFoundException {
        //JPA 영속성 컨테스트 내
        Folder origin = folderRepository.findById(folder.getId()).orElseThrow(FolderNotFoundException::new);
        checkOwner(member,origin);

        origin.setTitle(folder.getTitle());
        return origin;
    }

    @Override
    public void deleteFolder(Member member, Long folderId) throws FolderNotFoundException, UserNotFoundException,
                                                                InconsistentFolderOwnerException, CannotRemoveRootFolderException {
        Folder folder= folderRepository.findById(folderId).orElseThrow(FolderNotFoundException::new);
        if (folder.getParent() == null) throw new CannotRemoveRootFolderException();
        checkOwner(member, folder);

        Member memberPersist = memberRepository.findById(member.getId()).orElseThrow(UserNotFoundException::new);
        memberPersist.getFolders().remove(folder);
        folder.getParent().getChildren().remove(folder);
        folderRepository.deleteById(folderId);
    }

    @Override
    public Folder getRootFolder(String nickname) throws UserNotFoundException, NoteNotFoundException {
        Member user = memberRepository.findByNickname(nickname).orElseThrow(UserNotFoundException::new);
        return user.getFolders().stream().filter(folder -> folder.getParent() == null).findFirst().orElseThrow(NoteNotFoundException::new);
    }

    @Override
    public void checkOwner(Member member, Note note) throws InconsistentNoteOwnerException {
        if (!note.getAuthor().getId().equals(member.getId())) {
            throw new InconsistentNoteOwnerException();
        }
    }

    @Override
    public void checkOwner(Member member, Folder folder) throws InconsistentFolderOwnerException {
        if (!folder.getOwner().getId().equals(member.getId())) {
            throw new InconsistentFolderOwnerException();
        }
    }

    @Override
    public Slice<Note> searchPublicNotesByTitle(String keyword, Pageable pageable) throws Exception {
        return noteRepository.findAllByTitleContainingIgnoreCaseAndIsPublic(keyword, true, pageable);
    }

    @Override
    public List<Note> getNotesQuotingThis(Long noteId) throws Exception {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        return note.getQuoted().stream().map(Quotation::getEndNote).toList();
    }
}
