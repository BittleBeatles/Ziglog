package com.ziglog.ziglog.domain.member.service;

import com.ziglog.ziglog.ZiglogApplication;
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



    }

    @DisplayName("닉네임 형식 테스트 : 성공사례")
    @Test
    public void nicknameFormatTest_Success(){



    }
    //닉네임 중복 테스트 1)



    //회원가입 테스트


    //중복 가입 테스트 1 - 실패



    //닉네임 중복 테스트 2



    //중복 가입 테스트 2 - 성공


    //사용자 닉네임 변경 테스트 - 실패



    //닉네임 변경 테스트 - 성공



    //유저 프로필 변경 - 실패
    //유저가 없는 경우


    //유저 프로필 변경 - 성공


    //이메일을 통한 회원 조회 => 이건 언제 쓸지? 모름



    //닉네임을 통한 회원 조회

}