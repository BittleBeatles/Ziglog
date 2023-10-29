package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.ZiglogApplication;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.service.MemberServiceImpl;
import com.ziglog.ziglog.domain.note.entity.Note;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ContextConfiguration(classes = ZiglogApplication.class)
class NoteServiceImplTest {

    @Autowired
    private MemberServiceImpl memberService;

    @Autowired
    private NoteServiceImpl noteService;
    private Member member1 = new Member();
    private Member member2 = new Member();

    @DisplayName("임시 가입")
    @BeforeEach
    public void signUp() throws Exception{
        member1 = memberService.signUp("pj0642@gmail.com", "pys");
        member2 = memberService.signUp("pj0642@naver.com", "박영서");
    }

    @DisplayName("노트 생성 테스트 - 노트 작성자 일치 여부 테스트 : 성공")
    @Test
    void createNoteTest_Success() {
        Note note = noteService.createNote(member1);
        assertEquals(member1, note.getAuthor());
    }

    @DisplayName("노트 생성 테스트 - 노트 작성자 일치 여부 테스트 : 실패")
    @Test
    void createNoteTest_Fail() {
        Note note = noteService.createNote(member1);
        assertNotEquals(member2, note.getAuthor());
    }

    @DisplayName("노트 수정 테스트 - 요청자와 노트 소유자 확인 실패")
    @Test
    void noteModificationTest_DifferentOwner() {
        Note note = noteService.createNote(member1);
        assertThrows(Exception.class, () -> noteService.modifyNote(member2, note));
    }

    @DisplayName("노트 수정 테스트 - 요청자와 노트 소유자 일치")
    @Test
    void noteModificationTest_IdenticalOwner() {
        Note note = noteService.createNote(member1);
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
    void noteModificationTest_TitleAndContentModificationTest(){
        //노트 생성
        Note note = noteService.createNote(member1);

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
            note = noteService.getNote(note.getId());
        } catch (Exception e){

        }
        assertEquals(title, note.getTitle());
        assertEquals(content, note.getContent());
    }

    @DisplayName("노트 공개 여부 변경 테스트")
    @Test
    void noteModificationTest_SetPublicTest(){
        //노트 생성
        Note note = noteService.createNote(member1);

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
            noteService.setPublic(member1, modification);
            note = noteService.getNote(note.getId());
        } catch (Exception e){

        }
        assertTrue(note.isPublic());
    }

    @DisplayName("노트 삭제 테스트 - 실패")
    @Test
    void noteDeleteTest_Fail(){
        //노트 생성
        Note note = noteService.createNote(member1);
        assertFalse(note.isPublic());
    }

    @DisplayName("노트 조회 테스트 - 없는 id의 노트 조회")
    @Test
    void getNoteTest_NoId(){
        assertThrows(Exception.class, () -> noteService.getNote(2L));
    }



}