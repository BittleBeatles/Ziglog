package com.ziglog.ziglog.domain.member.service;

import com.ziglog.ziglog.domain.member.dto.request.ModifyUserRequestDto;
import com.ziglog.ziglog.domain.member.dto.request.NicknameDto;
import com.ziglog.ziglog.domain.member.dto.response.MyInfoResponseDto;
import com.ziglog.ziglog.domain.member.dto.response.NicknameValidationResponseDto;
import com.ziglog.ziglog.domain.member.dto.response.UserPublicInfoResponseDto;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.InvalidUserModificationRequestException;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.exception.exceptions.FolderNotFoundException;
import com.ziglog.ziglog.domain.note.exception.exceptions.NoteNotFoundException;
import com.ziglog.ziglog.domain.note.repository.FolderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final FolderRepository folderRepository;

    @Override
    public UserPublicInfoResponseDto modifyUserInfo(Member member, ModifyUserRequestDto modifyUserRequestDto)
            throws UserNotFoundException, InvalidUserModificationRequestException {
        Member memberPersist = memberRepository.findById(member.getId()).orElseThrow(UserNotFoundException::new);
        modifyUserNickname(memberPersist, modifyUserRequestDto.getNickname());
        modifyUserProfile(memberPersist, modifyUserRequestDto.getProfileUrl());
        return UserPublicInfoResponseDto.toDto(memberPersist);
    }

    @Override
    public NicknameValidationResponseDto validateNickname(Member member, NicknameDto nicknameDto) {
        return NicknameValidationResponseDto.toDto(isValidNickname(member, nicknameDto.getNickname()));
    }

    @Override
    public UserPublicInfoResponseDto getUserPublicInfoByNickname(String nickname) throws UserNotFoundException {
        return UserPublicInfoResponseDto.toDto(findUserByNickname(nickname));
    }

    @Override
    public MyInfoResponseDto getLoginUserInfo(Member member) throws UserNotFoundException, FolderNotFoundException {
        Member memberPersist = memberRepository.findById(member.getId()).orElseThrow(UserNotFoundException::new);

        for (Folder folder : memberPersist.getFolders()){
            if (folder.getParent() == null) return MyInfoResponseDto.toDto(memberPersist, folder);
        }
        throw new FolderNotFoundException();
    }

    @Override
    public Member findUserByEmail(String email) throws UserNotFoundException {
        return memberRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public Member findUserByNickname(String nickname) throws UserNotFoundException {
        return memberRepository.findByNickname(nickname).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public void modifyUserNickname(Member member, String nickname) throws UserNotFoundException, InvalidUserModificationRequestException {
        if (!isValidNickname(member, nickname)) throw new InvalidUserModificationRequestException();
        member.setNickname(nickname);
    }

    @Override
    public void modifyUserProfile(Member member, String profileUrl) throws UserNotFoundException{
        member.setProfileUrl(profileUrl);
    }

    @Override
    public boolean isValidNickname(Member member, String nickname) {
        //기존에 사용하던 닉네임과 동일한지 여부를 확인하는 로직이 추가돼야 o함
        if (member.getNickname().equals(nickname)) return true;
        if (!isValidNicknameFormat(nickname)) return false;
        return isNotDuplicatedNickname(nickname);
    }

    @Override //테스트에서만 사용됨
    public Member signUp(String email, String nickname) throws Exception{
        Member member = memberRepository.save(
                Member.builder()
                .email(email)
                .nickname(nickname)
                .password(UUID.randomUUID().toString())
                .build());

        Folder root = folderRepository.save(Folder.builder()
                    .title("root")
                    .owner(member)
                    .build());

        member.getFolders().add(root);
        return member;
    }

    public boolean isValidNicknameFormat(String nickname){
        String regex = "^[a-zA-Z0-9가-힣]{1,18}$";
        return nickname.matches(regex);
    }

    public boolean isNotDuplicatedNickname(String nickname){
        return !memberRepository.existsMemberByNickname(nickname);
    }
}
