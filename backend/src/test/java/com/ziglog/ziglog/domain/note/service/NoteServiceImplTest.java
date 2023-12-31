package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.ZiglogApplication;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.service.MemberServiceImpl;
import com.ziglog.ziglog.domain.note.dto.request.folder.CreateFolderRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.folder.ModifyFolderNameRequestDto;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import com.ziglog.ziglog.domain.note.exception.exceptions.NoAuthorizationToReadException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ContextConfiguration(classes = ZiglogApplication.class)
@Transactional
class NoteServiceImplTest {

    @Autowired
    private MemberServiceImpl memberService;

    @Autowired
    private NoteServiceImpl noteService;
    private Member member1 = new Member();
    private Member member2 = new Member();
    private Note note1 = new Note();
    private Note note2 = new Note();
    private Folder mem1RootFolder = new Folder();

    @DisplayName("임시 가입")
    @BeforeEach
    public void signUp() throws Exception{
        member1 = memberService.signUp("pj0642@gmail.com", "pys");
        member2 = memberService.signUp("pj0642@naver.com", "박영서");
        mem1RootFolder = member1.getFolders().stream().filter(folder -> folder.getParent()==null).findFirst().orElseThrow(Exception::new);
    }

    @DisplayName("노트 생성 테스트 - 노트 작성자 일치 여부 테스트 : 성공")
    @Test
    void createNoteTest_Success() throws Exception {
        Note note = noteService.createNote(member1, mem1RootFolder.getId());
        assertEquals(member1, note.getAuthor());
    }

    @DisplayName("노트 생성 테스트 - 노트 작성자 일치 여부 테스트 : 실패")
    @Test
    void createNoteTest_Fail() throws Exception {
        Note note = noteService.createNote(member1, mem1RootFolder.getId());
        assertNotEquals(member2, note.getAuthor());
    }

    @DisplayName("노트 수정 테스트 - 요청자와 노트 소유자 확인 실패")
    @Test
    void noteModificationTest_DifferentOwner() throws Exception {
        Note note = noteService.createNote(member1, mem1RootFolder.getId());
        assertThrows(Exception.class, () -> noteService.modifyNote(member2, note));
    }

    @DisplayName("노트 수정 테스트 - 요청자와 노트 소유자 일치")
    @Test
    void noteModificationTest_IdenticalOwner() throws Exception {
        Note note = noteService.createNote(member1, mem1RootFolder.getId());
        assertDoesNotThrow(() -> noteService.modifyNote(member1, note));
    }

    @DisplayName("노트 수정 테스트 - 존재하지 않는 노트 변경 시도 테스트")
    @Test
    void noteModificationTest_NoNoteInDB() {
        Note note = Note.builder().build();
        assertThrows(Exception.class, () -> noteService.modifyNote(member1, note));
    }

    @DisplayName("노트 수정 테스트 - 노트 제목 및 내용 변경사항 반영 테스트")
    @Test
    void noteModificationTest_TitleAndContentModificationTest() throws Exception{
        //노트 생성
        Note note = noteService.createNote(member1, mem1RootFolder.getId());

        //프론트에서 변경된 노트 정보
        String title = "title";
        String content = "content";
        Note modification = Note.builder()
                .id(note.getId())
                .author(note.getAuthor())
                .title(title)
                .content(content)
                .build();

        try {
            noteService.modifyNote(member1, modification);
            note = noteService.readNote(member1, note.getId());
        } catch (Exception e){

        }
        assertEquals(title, note.getTitle());
        assertEquals(content, note.getContent());
    }

    @DisplayName("노트 수정 테스트 - 이 글이 인용하고 있는 글 목록 업데이트 테스트")
    @Test
    void noteModificationTest_QuotingListUpdateTest() throws Exception{
        //노트 생성
        note1 = noteService.createNote(member1, mem1RootFolder.getId());
        note2 = noteService.createNote(member1, mem1RootFolder.getId());

        List<Quotation> quotings = new ArrayList<>();
        quotings.add(Quotation.builder().startNote(note1).endNote(note2).build());

        Note note1Modified = Note.builder()
                .id(note1.getId())
                .title("title1")
                .content("content1")
                .author(member1)
                .quoting(quotings)
                .build();

        noteService.modifyNote(member1, note1Modified);
        assertEquals(1, noteService.readNote(member1, note1.getId()).getQuoting().size());
    }

    @DisplayName("노트 공개 여부 변경 테스트")
    @Test
    void noteModificationTest_SetPublicTest() throws Exception{
        //노트 생성
        Note note = noteService.createNote(member1, mem1RootFolder.getId());

        //프론트에서 변경된 노트 정보
        String title = "title";
        String content = "content";
        Note modification = Note.builder()
                .id(note.getId())
                .author(note.getAuthor())
                .title(title)
                .content(content)
                .isPublic(true)
                .build();

        try {
            noteService.setPublic(member1, modification.getId(), modification.isPublic());
            note = noteService.readNote(member1, note.getId());
        } catch (Exception e){

        }
        assertTrue(note.isPublic());
    }

    @DisplayName("노트 삭제 테스트 - 실패")
    @Test
    void noteDeleteTest_Fail() throws Exception{
        //노트 생성
        Note note = noteService.createNote(member1, mem1RootFolder.getId());
        assertFalse(note.isPublic());
    }

    @DisplayName("노트 조회 테스트 - 없는 id의 노트 조회")
    @Test
    void getNoteTest_NoId(){
        assertThrows(Exception.class, () -> noteService.readNote(member1, 2L));
    }

    @DisplayName("노트 조회 테스트 - 성공")
    @Test
    void getNoteTest_Success() throws Exception{
        Note note = noteService.createNote(member1, mem1RootFolder.getId());
        assertDoesNotThrow(() -> noteService.readNote(member1, note.getId()));
    }

    @DisplayName("폴더 생성 테스트")
    @Test
    void createFolderTest() throws Exception {
        CreateFolderRequestDto folderRequestDto = new CreateFolderRequestDto("folder", mem1RootFolder.getId());
        noteService.createFolder(member1, folderRequestDto);
        assertEquals(2, member1.getFolders().size());
    }

    @DisplayName("폴더명 수정 테스트 - 잘못된 사용자")
    @Test
    void modifyFolderTest_InvalidOwner() throws Exception{
        CreateFolderRequestDto folderRequestDto = new CreateFolderRequestDto("folder", mem1RootFolder.getId());
        Folder folder = noteService.createFolder(member1, folderRequestDto);

        ModifyFolderNameRequestDto requestDto = new ModifyFolderNameRequestDto("folder2", folder.getId());
        assertThrows(Exception.class, () -> noteService.modifyFolder(member2, requestDto));
    }

    @DisplayName("폴더명 수정 테스트 - 존재하지 않는 폴더")
    @Test
    void modifyFolderTest_NoSuchFolder(){
        ModifyFolderNameRequestDto requestDto = new ModifyFolderNameRequestDto("folder2",  0L);
        assertThrows(Exception.class, () -> noteService.modifyFolder(member1, requestDto));
    }

    @DisplayName("폴더명 수정 테스트 - 성공 사례")
    @Test
    void modifyFolderTest_Success() throws Exception {
        CreateFolderRequestDto folderRequestDto = new CreateFolderRequestDto("folder", mem1RootFolder.getId());
        Folder folder = noteService.createFolder(member1, folderRequestDto);

        ModifyFolderNameRequestDto modifyFolderNameRequestDto = new ModifyFolderNameRequestDto("folder2", folder.getId());

        assertEquals("folder2", noteService.modifyFolder(member1, modifyFolderNameRequestDto).getTitle());
    }

    @DisplayName("폴더 삭제 테스트 - 잘못된 사용자")
    @Test
    void deleteFolderTest_InvalidOwner() throws Exception{
        CreateFolderRequestDto folderRequestDto = new CreateFolderRequestDto("folder", mem1RootFolder.getId());
        Folder folderToDelete = noteService.createFolder(member1, folderRequestDto);

        assertThrows(Exception.class, () -> noteService.deleteFolder(member2, folderToDelete.getId()));
    }

    @DisplayName("폴더 삭제 테스트 - 없는 폴더 삭제")
    @Test
    void deleteFolderTest_NoFolder(){
        Folder folder = Folder.builder()
                .title("folder")
                .owner(member1)
                .build();

        assertThrows(Exception.class, () -> noteService.deleteFolder(member2, folder.getId()));
    }

    @DisplayName("폴더 삭제 테스트 - 성공")
    @Test
    void deleteFolderTest_Success() throws Exception{
        CreateFolderRequestDto folderRequestDto = new CreateFolderRequestDto("folder", mem1RootFolder.getId());
        Folder folderToDelete = noteService.createFolder(member1, folderRequestDto);

        assertDoesNotThrow(() -> noteService.deleteFolder(member1, folderToDelete.getId()));
        assertEquals(1, member1.getFolders().size());
    }

    @DisplayName("폴더 리스트 테스트 - 없는 사용자")
    @Test
    void listFolderTest_InvalidUser(){
        String nickname = "noUser";
        assertThrows(Exception.class, () -> noteService.getRootFolder(nickname));
    }

    @DisplayName("폴더 리스트 테스트 - 성공 사례")
    @Test
    void listFolderTest_Success() throws Exception{
        CreateFolderRequestDto folderRequestDto = new CreateFolderRequestDto("folder", mem1RootFolder.getId());
        CreateFolderRequestDto folderRequestDto2 = new CreateFolderRequestDto("folder2", mem1RootFolder.getId());

        noteService.createFolder(member1, folderRequestDto);
        noteService.createFolder(member1, folderRequestDto2);

        assertDoesNotThrow(() -> noteService.getRootFolder(member1.getNickname()));
    }

    @DisplayName("폴더 사이의 부모 관계 생성이 제대로 되는지 테스트")
    @Test
    void checkParentChildRelation_BetweenFolders() throws Exception{
        CreateFolderRequestDto folderRequestDto = new CreateFolderRequestDto("folder", mem1RootFolder.getId());
        Folder folder = noteService.createFolder(member1, folderRequestDto);

        CreateFolderRequestDto folderRequestDto2 = new CreateFolderRequestDto("folder2", folder.getId());
        Folder folder2 = noteService.createFolder(member1, folderRequestDto2);

        assertTrue(folder.getChildren().contains(folder2));//폴더1의 자식을 확인
        assertEquals(folder, folder2.getParent());//폴더2의 부모를 확인
    }

    @DisplayName("노트-폴더 사이의 부모 관계 생성이 제대로 되는지 테스트")
    @Test
    void checkParentChildRelation_BetweenFolderAndNote() throws Exception{
        CreateFolderRequestDto folderRequestDto = new CreateFolderRequestDto("folder", mem1RootFolder.getId());
        Folder folder = noteService.createFolder(member1, folderRequestDto);
        Note note = noteService.createNote(member1, folder.getId());

        assertTrue(folder.getNotes().contains(note));//폴더1의 자식을 확인
        assertEquals(folder, note.getFolder());//폴더2의 부모를 확인
    }

    @DisplayName("비공개 글을 다른 사람이 조회할 수 있는지 테스트")
    @Test
    void readPrivateNote() throws Exception {
        Note note = noteService.createNote(member1, mem1RootFolder.getId());
        assertThrows(NoAuthorizationToReadException.class, () -> noteService.readNote(member2, note.getId()));
    }

    @DisplayName("공개 글을 다른 사람이 조회할 수 있는지 테스트")
    @Test
    void readPublicNoteByOtherUser() throws Exception {
        Note note = noteService.createNote(member1, mem1RootFolder.getId());
        noteService.setPublic(member1, note.getId(), true);

        assertNotNull(noteService.readNote(member2, note.getId()));
    }



}