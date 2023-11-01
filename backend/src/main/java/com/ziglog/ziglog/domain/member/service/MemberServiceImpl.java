package com.ziglog.ziglog.domain.member.service;

import com.ziglog.ziglog.domain.member.entity.Member;
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
        memberRepository.findByEmail(member.getEmail())
                        .orElseThrow(Exception::new)
                        .setNickname(nickname);
    }

    @Override
    public void modifyUserProfile(Member member, String profileUrl) throws Exception{
        memberRepository.findByEmail(member.getEmail())
                        .orElseThrow(Exception::new)
                        .setProfileUrl(profileUrl);
    }

    @Override
    public boolean isValidNickname(String nickname) {
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
        String regex = "^[a-zA-Z0-9가-힣]{1,12}$";
        return nickname.matches(regex);
    }

    public boolean isNotDuplicatedNickname(String nickname){
        return !memberRepository.existsMemberByNickname(nickname);
    }

    @Override
    public void testContext(Member member) throws  Exception{
        Member mem2 = memberRepository.findByEmail(member.getEmail()).orElseThrow(Exception::new);
        if (mem2.equals(member)) log.info("same entity in JPA persistence context");
        else log.info("diff");
    }
}
