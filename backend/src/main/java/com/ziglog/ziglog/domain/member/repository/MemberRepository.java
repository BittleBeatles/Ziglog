package com.ziglog.ziglog.domain.member.repository;

import com.ziglog.ziglog.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findMemberByEmail(String email);
    Optional<Member> findMemberByNickname(String nickname);
    boolean existsMemberByEmail(String email);
    boolean existsMemberByNickname(String email);
}
