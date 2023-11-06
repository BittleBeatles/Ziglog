package com.ziglog.ziglog.domain.member.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.InvalidUserModificationRequestException;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;

public interface MemberService {

    Member findUserByEmail(String email) throws UserNotFoundException;
    Member findUserByNickname(String nickname) throws UserNotFoundException;
    void modifyUserNickname(Member member, String nickname) throws UserNotFoundException, InvalidUserModificationRequestException;
    void modifyUserProfile(Member member, String profileUrl) throws UserNotFoundException;
    Member signUp(String email, String nickname) throws Exception;
    boolean isValidNickname(Member member, String nickname);
    boolean isValidNicknameFormat(String nickname);
    boolean isNotDuplicatedNickname(String nickname);
}
