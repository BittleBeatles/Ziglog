package com.ziglog.ziglog.domain.member.service;

import com.ziglog.ziglog.domain.member.dto.request.ModifyUserRequestDto;
import com.ziglog.ziglog.domain.member.dto.request.NicknameDto;
import com.ziglog.ziglog.domain.member.dto.response.MyInfoResponseDto;
import com.ziglog.ziglog.domain.member.dto.response.NicknameValidationResponseDto;
import com.ziglog.ziglog.domain.member.dto.response.UserPublicInfoResponseDto;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.InvalidUserModificationRequestException;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.note.exception.exceptions.FolderNotFoundException;

public interface MemberService {

    UserPublicInfoResponseDto modifyUserInfo(Member member, ModifyUserRequestDto modifyUserRequestDto) throws  UserNotFoundException, InvalidUserModificationRequestException;
    UserPublicInfoResponseDto getUserPublicInfoByNickname(String nickname) throws UserNotFoundException;
    NicknameValidationResponseDto validateNickname(Member member, NicknameDto nicknameDto);
    MyInfoResponseDto getLoginUserInfo(Member member) throws UserNotFoundException, FolderNotFoundException;
    Member findUserByEmail(String email) throws UserNotFoundException;
    Member findUserByNickname(String nickname) throws UserNotFoundException;
    void modifyUserNickname(Member member, String nickname) throws UserNotFoundException, InvalidUserModificationRequestException;
    void modifyUserProfile(Member member, String profileUrl) throws UserNotFoundException;
    Member signUp(String email, String nickname) throws Exception;
    boolean isValidNickname(Member member, String nickname);
    boolean isValidNicknameFormat(String nickname);
    boolean isNotDuplicatedNickname(String nickname);
}
