package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;

import java.util.List;

public interface NoteService {

    // 노트
    Note createNote(); //비어있는 새 노트를 생성

    Note saveNote(Note note) throws Exception; //현재 이 노트의 내용을 저장

    Boolean deleteNote(Long noteId); //해당 아이디의 노트를 삭제

    Note getNote(Long noteId) throws Exception; //해당 ID의 노트의 Detail을 가져 오기

    List<Note> findNotesQuotingThisNote(Long noteId); //이 노트를 참조하고 있는 노트의 리스트를 반환

    // 폴더
    Folder addFolder(Folder folder);//새로운 폴더를 추가

    Folder modifyFolder(Folder folder);//폴더의 이름을 변경

    Boolean deleteFolder(Long folderId); //해당 id의 폴더를 삭제

    List<Folder> listFolder(Long userId); //해당 사용자의 모든 디렉토리를 반환

    // 인용
    Boolean addQuotation(Long fromNote, Long toNote); //인용 관계를 추가

    //인용 관계 삭제
    Boolean deleteQuotation(Long fromNote, Long toNote); //인용 관계를 삭제
}
