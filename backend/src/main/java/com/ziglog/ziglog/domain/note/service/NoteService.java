package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.exception.exceptions.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface NoteService {

    // 노트
    void checkOwner(Member member, Note note) throws InconsistentNoteOwnerException;
    void checkOwner(Member member, Folder folder) throws InconsistentNoteOwnerException;;
    Note createNote(Member member, Long folderId) throws UserNotFoundException, FolderNotFoundException, InconsistentFolderOwnerException; //비어있는 새 노트를 생성
    Note modifyNote(Member member, Note note) throws NoteNotFoundException, InconsistentFolderOwnerException; //현재 이 노트의 내용을 저장
    Note setPublic(Member member, Long noteId, Boolean isPublic)  throws InconsistentFolderOwnerException, NoteNotFoundException;
    void deleteNote(Member member, Long noteId) throws InconsistentNoteOwnerException, NoteNotFoundException; //해당 아이디의 노트를 삭제
    Note readNote(Member member, Long noteId) throws NoteNotFoundException, NoAuthorizationToReadException; //해당 ID의 노트의 Detail을 가져 오기
    List<Note> getNotesQuotingThis(Long noteId) throws NoteNotFoundException;
    Slice<Note> searchPublicNotesByTitle(String keyword, Pageable pageable) throws Exception;
    // 폴더
    Folder createFolder(Member member, String title, Long folderId) throws FolderNotFoundException, InconsistentNoteOwnerException, UserNotFoundException;//새로운 폴더를 추가

    Folder modifyFolder(Member member, Folder folder) throws InconsistentFolderOwnerException, FolderNotFoundException;//폴더의 이름을 변경

    void deleteFolder(Member member, Long folderId) throws FolderNotFoundException, UserNotFoundException,
            InconsistentFolderOwnerException, CannotRemoveRootFolderException; //해당 id의 폴더를 삭제
    Folder getRootFolder(String nickname) throws UserNotFoundException, NoteNotFoundException; //해당 사용자의 모든 디렉토리를 반환
}
