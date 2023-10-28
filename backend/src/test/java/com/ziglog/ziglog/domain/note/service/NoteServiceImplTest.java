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


}