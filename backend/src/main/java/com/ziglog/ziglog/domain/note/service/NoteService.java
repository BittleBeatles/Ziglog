package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;

import java.util.List;

public interface NoteService {

    // 노트
    Boolean checkOwner(Member member, Note note);
    Boolean checkOwner(Member member, Folder folder);
    Note createNote(Member member, Folder folder) throws Exception; //비어있는 새 노트를 생성

    Note modifyNote(Member member, Note note) throws Exception; //현재 이 노트의 내용을 저장

    Note setPublic(Member member, Note note) throws Exception;

    Void deleteNote(Member member, Long noteId) throws Exception; //해당 아이디의 노트를 삭제

    Note getNote(Long noteId) throws Exception; //해당 ID의 노트의 Detail을 가져 오기

    List<Note> findNotesQuotingThisNote(Long noteId) throws Exception; //이 노트를 참조하고 있는 노트의 리스트를 반환

    // 폴더
    Folder addFolder(Member member, Folder folder);//새로운 폴더를 추가

    Folder modifyFolder(Member member, Folder folder) throws Exception;//폴더의 이름을 변경

    Boolean deleteFolder(Member member, Long folderId) throws Exception; //해당 id의 폴더를 삭제

    List<Folder> listFolder(String nickname) throws Exception; //해당 사용자의 모든 디렉토리를 반환
}
