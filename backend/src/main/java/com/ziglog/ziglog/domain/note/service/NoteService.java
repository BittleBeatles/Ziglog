package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface NoteService {

    // 노트
    void checkOwner(Member member, Note note);
    void checkOwner(Member member, Folder folder);
    Note createNote(Member member, Long folderId) throws Exception; //비어있는 새 노트를 생성
    Note modifyNote(Member member, Note note) throws Exception; //현재 이 노트의 내용을 저장
    Note setPublic(Member member, Long noteId, Boolean isPublic) throws Exception;
    void deleteNote(Member member, Long noteId) throws Exception; //해당 아이디의 노트를 삭제
    Note getNote(Member member, Long noteId) throws Exception; //해당 ID의 노트의 Detail을 가져 오기
    List<Note> getNotesQuotingThis(Long noteId) throws Exception;
    Slice<Note> searchPublicNotesByTitle(String keyword, Pageable pageable) throws Exception;
    // 폴더
    Folder createFolder(Member member, String title, Long folderId) throws Exception;//새로운 폴더를 추가

    Folder modifyFolder(Member member, Folder folder) throws Exception;//폴더의 이름을 변경

    void deleteFolder(Member member, Long folderId) throws Exception; //해당 id의 폴더를 삭제

    Folder getRootFolder(String nickname) throws Exception; //해당 사용자의 모든 디렉토리를 반환
}
