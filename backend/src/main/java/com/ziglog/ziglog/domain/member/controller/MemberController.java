package com.ziglog.ziglog.domain.member.controller;

import com.ziglog.ziglog.domain.member.dto.response.UserPublicInfoResponseDto;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.service.MemberService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @PutMapping("/modify/nickname")
    public ResponseDto<Void> modifyNickname(@AuthenticationPrincipal CustomUserDetails userDetails,
                                              String nickname) throws Exception{
        //SecurityContext 내 사용자의 닉네임을 변경시켜 줘야 함
        memberService.modifyUserNickname(userDetails.member(), nickname);
        return ResponseDto.of(200, "수정됨");
    }

    @PutMapping("/modify/profile")
    public ResponseDto<Void> modifyProfile(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                String profileUrl) throws Exception{
        Member member = userDetails.member();
        memberService.modifyUserProfile(member, profileUrl);
        return ResponseDto.of(200, "수정됨");
    }

    @PutMapping("/check/nickname")
    public ResponseDto<Boolean> checkNicknameValidation(String nickname){
        return ResponseDto.of(200, "사용 가능한 닉네임입니다", memberService.isValidNickname(nickname));
    }

    @GetMapping("/{nickname}")
    public ResponseDto<UserPublicInfoResponseDto> getUserPublicInfo(@PathVariable String nickname) throws Exception{
        return ResponseDto.of(200, "사용자 공재 정보 조회",
                new UserPublicInfoResponseDto(memberService.findUserByNickname(nickname)));
    }

    @GetMapping("/info")
    public ResponseDto<UserPublicInfoResponseDto> getMyInfo(@AuthenticationPrincipal CustomUserDetails userDetails) throws Exception{
        Member member = userDetails.member();
        log.info("getMyInfo : {}", member.getNickname());
        return ResponseDto.of(200, "로그인한 사용자의 공개 정보 조회",
                new UserPublicInfoResponseDto(memberService.findUserByNickname(member.getNickname())));
    }

    @GetMapping("/test")
    public ResponseDto<Void> test(){
        return ResponseDto.of(200, "테스트");
    }
}
