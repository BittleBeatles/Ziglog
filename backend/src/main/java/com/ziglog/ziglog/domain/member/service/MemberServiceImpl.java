package com.ziglog.ziglog.domain.member.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.InvalidUserModificationRequestException;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.repository.FolderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.metamodel.mapping.ForeignKeyDescriptor;
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
        memberRepository.findByEmail(member.getEmail())
                        .orElseThrow(UserNotFoundException::new)
                        .setNickname(nickname);
    }

    @Override
    public void modifyUserProfile(Member member, String profileUrl) throws UserNotFoundException{
        memberRepository.findByEmail(member.getEmail())
                        .orElseThrow(UserNotFoundException::new)
                        .setProfileUrl(profileUrl);
    }

    @Override
    public boolean isValidNickname(Member member, String nickname) {
        //기존에 사용하던 닉네임과 동일한지 여부를 확인하는 로직이 추가돼야 o함
        if (member.getNickname().equals(nickname)) return true;
        if (!isValidNicknameFormat(nickname)) return false;
        return isNotDuplicatedNickname(nickname);
    }

    @Override
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
