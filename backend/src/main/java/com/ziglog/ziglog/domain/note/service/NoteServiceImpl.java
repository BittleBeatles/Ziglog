package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.repository.FolderRepository;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import com.ziglog.ziglog.domain.note.repository.QuotationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NoteServiceImpl implements NoteService{

    private final FolderRepository folderRepository;
    private final NoteRepository noteRepository;
    private final QuotationRepository quotationRepository;

    @Override
    public Note createNote() {

        Member member = new Member();//SecurityContext 내의 사용자로 변할 것

        Note note = Note.builder()
                    .author(member)
                    .build();
        return noteRepository.save(note);
    }

    @Override
    public Note saveNote(Note note) throws Exception {

        //글의 저자가 Security Context 내의 유저와 같은지 확인


        //영속성 Context 내의 노트
        Note origin = noteRepository.findNoteById(note.getId()).orElseThrow(() -> new Exception());

        if (note.isPublic()){


        }
        else {


        }

        return null;
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

    @Override
    public Folder addFolder(Folder folder) {
        return null;
    }

    @Override
    public Folder modifyFolder(Folder folder) {
        return null;
    }

    @Override
    public Boolean deleteFolder(Long folderId) {
        return null;
    }

    @Override
    public List<Folder> listFolder(Long userId) {
        return null;
    }

    @Override
    public Boolean addQuotation(Long fromNote, Long toNote) {
        return null;
    }

    @Override
    public Boolean deleteQuotation(Long fromNote, Long toNote) {
        return null;
    }
}
