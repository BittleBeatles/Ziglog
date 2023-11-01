package com.ziglog.ziglog.domain.member.service;

import com.ziglog.ziglog.domain.member.entity.Member;

public interface MemberService {

    Member findUserByEmail(String email) throws Exception;
    Member findUserByNickname(String nickname) throws Exception;
    void modifyUserNickname(Member member, String nickname) throws Exception;
    void modifyUserProfile(Member member, String profileUrl) throws Exception;
    Member signUp(String email, String nickname) throws Exception;
    boolean isValidNickname(String nickname);
    boolean isValidNicknameFormat(String nickname);
    boolean isNotDuplicatedNickname(String nickname);

    void testContext(Member member) throws Exception;
}
