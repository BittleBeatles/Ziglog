package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.note.dto.request.folder.ChangeFolderParentRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.folder.CreateFolderRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.folder.ModifyFolderNameRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.note.ChangeNoteParentRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.note.CreateNoteRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.note.ModifyNoteRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.note.SetPublicRequestDto;
import com.ziglog.ziglog.domain.note.dto.response.folder.RetrieveFolderOnlyResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.folder.RetrieveFolderResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.note.IsPublicResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.note.ReadNoteResponseDto;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.exception.exceptions.*;
import org.springframework.web.client.HttpClientErrorException;

public interface NoteService {

    void createNote(Member member, CreateNoteRequestDto requestDto)throws UserNotFoundException, FolderNotFoundException, InconsistentFolderOwnerException;
    ReadNoteResponseDto read(Member member, Long noteId) throws NoteNotFoundException, NoAuthorizationToReadException;
    IsPublicResponseDto setPublic(Member member, Long noteId, SetPublicRequestDto requestDto)  throws InconsistentFolderOwnerException, NoteNotFoundException;
    void modifyNote(Member member, Long noteId, ModifyNoteRequestDto requestDto) throws NoteNotFoundException, InconsistentFolderOwnerException;
    RetrieveFolderResponseDto retrieveRootNote(String nickname) throws UserNotFoundException, NoteNotFoundException;

    void changeNoteParent(Member member, ChangeNoteParentRequestDto requestDto) throws UserNotFoundException, NoteNotFoundException, FolderNotFoundException, InconsistentFolderOwnerException, InconsistentNoteOwnerException;
    void changeFolderParent(Member member, ChangeFolderParentRequestDto requestDto) throws UserNotFoundException, FolderNotFoundException, InconsistentFolderOwnerException, HttpClientErrorException;

    // 노트
    void checkOwner(Member member, Note note) throws InconsistentNoteOwnerException;
    void checkOwner(Member member, Folder folder) throws InconsistentNoteOwnerException;;
    Note createNote(Member member, Long folderId) throws UserNotFoundException, FolderNotFoundException, InconsistentFolderOwnerException; //비어있는 새 노트를 생성
    Note modifyNote(Member member, Note note) throws NoteNotFoundException, InconsistentFolderOwnerException; //현재 이 노트의 내용을 저장
    Note setPublic(Member member, Long noteId, Boolean isPublic) throws InconsistentFolderOwnerException, NoteNotFoundException;
    void deleteNote(Member member, Long noteId) throws InconsistentNoteOwnerException, NoteNotFoundException; //해당 아이디의 노트를 삭제
    Note readNote(Member member, Long noteId) throws NoteNotFoundException, NoAuthorizationToReadException; //해당 ID의 노트의 Detail을 가져 오기

   // 폴더
    Folder createFolder(Member member, CreateFolderRequestDto requestDto) throws FolderNotFoundException, InconsistentNoteOwnerException, UserNotFoundException;//새로운 폴더를 추가
    Folder modifyFolder(Member member, ModifyFolderNameRequestDto requestDto) throws InconsistentFolderOwnerException, FolderNotFoundException;//폴더의 이름을 변경
    void deleteFolder(Member member, Long folderId) throws FolderNotFoundException, UserNotFoundException,
            InconsistentFolderOwnerException, CannotRemoveRootFolderException; //해당 id의 폴더를 삭제
    Folder getRootFolder(String nickname) throws UserNotFoundException, FolderNotFoundException; //해당 사용자의 모든 디렉토리를 반환
    RetrieveFolderOnlyResponseDto listFolders(String nickname, Long folderId) throws UserNotFoundException, FolderNotFoundException;
}
