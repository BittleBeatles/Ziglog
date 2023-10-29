package com.ziglog.ziglog.domain.member.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.entity.Folder;
import lombok.RequiredArgsConstructor;
import org.hibernate.metamodel.mapping.ForeignKeyDescriptor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public Member findUserByEmail(String email) throws Exception {
        return memberRepository.findByEmail(email).orElseThrow(() -> new Exception());
    }

    @Override
    public Member findUserByNickname(String nickname) throws Exception{
        return memberRepository.findByNickname(nickname).orElseThrow(() -> new Exception());
    }

    @Override
    public void modifyUserNickname(Member member, String nickname) throws Exception{
        if (!isValidNickname(nickname)) throw new Exception();
        member.setNickname(nickname);
    }

    @Override
    public void modifyUserProfile(Member member, String profileUrl) throws Exception{
        memberRepository.findByEmail(member.getEmail())
                        .orElseThrow(() -> new Exception())
                        .setProfileUrl(profileUrl);
    }

    @Override
    public boolean isValidNickname(String nickname) {
        if (!isValidNicknameFormat(nickname)) return false;
        return isNotDuplicatedNickname(nickname);
    }

    @Override
    public Member signUp(String email, String nickname) throws Exception{
        Member member = Member.builder()
                .email(email)
                .nickname(nickname)
                .password(UUID.randomUUID().toString())
                .build();
        return memberRepository.save(member);
    }

    public boolean isValidNicknameFormat(String nickname){
        String regex = "^[a-zA-Z0-9가-힣]{1,12}$";
        return nickname.matches(regex);
    }

    public boolean isNotDuplicatedNickname(String nickname){
        return !memberRepository.existsMemberByNickname(nickname);
    }
}
