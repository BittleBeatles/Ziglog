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
    public void modifyUserNickname(String nickname) throws Exception{
        if (!isValidNickname(nickname)) throw new Exception();
        Member member = new Member();//Security Context의 사용자
        member.setNickname(nickname);
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

    private boolean isValidNicknameFormat(String nickname){
        String regex = "^[a-zA-Z0-9가-힣]{2,8}$";
        return nickname.matches(regex);
    }

    private boolean isNotDuplicatedNickname(String nickname){
        return !memberRepository.existsMemberByNickname(nickname);
    }
}
