package com.ziglog.ziglog.domain.member.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public Member findUserByEmail(String email) throws Exception {
        return memberRepository.findMemberByEmail(email).orElseThrow(() -> new Exception());
    }

    @Override
    public Member findUserByNickname(String nickname) throws Exception{
        return memberRepository.findMemberByNickname(nickname).orElseThrow(() -> new Exception());
    }

    @Override
    public void modifyUserNickname(Member member, String nickname) throws Exception{
        if (!isValidNickname(nickname)) throw new Exception();
        member.setNickname(nickname);
    }

    @Override
    public void modifyUserProfile(Member member, String profileUrl) throws Exception{
        member.setProfileUrl(profileUrl);
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
