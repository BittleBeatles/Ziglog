package com.ziglog.ziglog.domain.member.service;

import com.ziglog.ziglog.ZiglogApplication;
import com.ziglog.ziglog.domain.member.entity.Member;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ContextConfiguration(classes = ZiglogApplication.class)
class MemberServiceImplTest {

    @Autowired
    private MemberServiceImpl memberService;

    @DisplayName("임시 가입")
    @Test
    @BeforeEach
    public void signUp() throws Exception{
        memberService.signUp("pj0642@gmail.com", "pys");
    }

    //닉네임 형식 테스트
    @DisplayName("닉네임 형식 테스트 : 빈 문자열")
    @Test
    public void nicknameFormatTest_EmptyString(){
        String str = "";
        assertFalse(memberService.isValidNicknameFormat(str));
    }

    @DisplayName("닉네임 형식 테스트 : 12자 초과")
    @Test
    public void nicknameFormatTest_StringOver12(){
        String str = "abcdabcdabcd1";
        assertFalse(memberService.isValidNicknameFormat(str));
    }

    @DisplayName("닉네임 형식 테스트 : 비허용문자")
    @Test
    public void nicknameFormatTest_WithSpecialChar(){
        String str = "abcd_abcdabc";
        assertFalse(memberService.isValidNicknameFormat(str));
    }

    @DisplayName("닉네임 형식 테스트 : 성공사례")
    @Test
    public void nicknameFormatTest_Success(){
        String str = "가힣abcdABCD12";
        assertTrue(memberService.isValidNicknameFormat(str));
    }

    //닉네임 중복 테스트 1)
    @DisplayName("닉네임 중복 테스트 : 실패")
    @Test
    public void nicknameDuplicationCheckTest_Failure(){
        String str = "pys";
        assertFalse(memberService.isNotDuplicatedNickname(str));
    }

    //닉네임 중복 테스트 2
    @DisplayName("닉네임 중복 테스트 : 성공")
    @Test
    public void nicknameDuplicationCheckTest_Success(){
        String str = "ppys";
        assertTrue(memberService.isNotDuplicatedNickname(str));
    }

    //사용자 닉네임 변경 테스트 - 실패
    @DisplayName("사용자 닉네임 변경 테스트 : 실패")
    @Test
    public void nicknameModificationTest_WithExistingNickname() throws Exception {
        Member memberToSignUp = memberService.signUp("suhyeng@ssafy.io", "lsh");
        String nickToModify = "pys";

        assertThrows(Exception.class, () -> memberService.modifyUserNickname(memberToSignUp, nickToModify));
    }

    //닉네임 변경 테스트 - 성공
    @DisplayName("사용자 닉네임 변경 테스트 : 성공")
    @Test
    public void nicknameModificationTest_Success() throws Exception {
        Member memberToSignUp = memberService.signUp("suhyeng@ssafy.io", "lsh");
        String nickToModify = "임수형인데요";

        assertDoesNotThrow(() -> memberService.modifyUserNickname(memberToSignUp, nickToModify));
    }

    //유저 프로필 변경 - 성공
    @DisplayName("사용자 프로필 변경 테스트 - 성공")
    @Test
    public void profileModificationTest_Success() throws Exception {
        Member memberToModifyProfileUrl = memberService.findUserByEmail("pj0642@gmail.com");
        assertDoesNotThrow(() -> memberService.modifyUserProfile(memberToModifyProfileUrl, "asdasd"));
    }

    @DisplayName("이메일을 통한 회원 조회 테스트 : 없는 이메일")
    @Test
    public void findMemberByEmail_NoSuchMember() throws Exception {
        assertThrows(Exception.class, () -> memberService.findUserByEmail("pj0642@naver.com"));
    }

    @DisplayName("이메일을 통한 회원 조회 테스트 : 성공")
    @Test
    public void findMemberByEmail_Success () throws Exception {
        assertDoesNotThrow(() -> memberService.findUserByEmail("pj0642@gmail.com"));
    }

    //닉네임을 통한 회원 조회
    @DisplayName("닉네임을 통한 회원 조회 테스트 : 없는 닉네임")
    @Test
    public void findMemberByNickname_NoSuchMember() throws Exception {
        assertThrows(Exception.class, () -> memberService.findUserByNickname("pj0642@naver.com"));
    }
}