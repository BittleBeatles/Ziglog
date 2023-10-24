package com.ziglog.ziglog.domain.member.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.entity.Role;

import java.util.Optional;

public interface MemberService {

    Member findUserByEmail(String email);
    Member findUserByNickname(String nickname);

    void modifyUserNickname(String nickname);
    boolean checkNicknameDuplication(String nickname);
    void signUp(String email, String nickname);
}
