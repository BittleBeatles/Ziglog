package com.ziglog.ziglog.domain.member.controller;

import com.ziglog.ziglog.domain.member.dto.request.NicknameDto;
import com.ziglog.ziglog.domain.member.dto.request.ProfileUrlDto;
import com.ziglog.ziglog.domain.member.dto.response.NicknameValidationResponseDto;
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
    public ResponseDto<UserPublicInfoResponseDto> modifyNickname(@AuthenticationPrincipal CustomUserDetails userDetails,
                                              NicknameDto nickname) throws Exception{
        Member member = userDetails.member();
        memberService.modifyUserNickname(member, nickname.getNickname());
        return ResponseDto.of(UserPublicInfoResponseDto.toDto(member));
    }

    @PutMapping("/modify/profile")
    public ResponseDto<UserPublicInfoResponseDto> modifyProfile(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                ProfileUrlDto profileUrl) throws Exception{
        Member member = userDetails.member();
        memberService.modifyUserProfile(member, profileUrl.getProfileUrl());
        return ResponseDto.of(UserPublicInfoResponseDto.toDto(member));
    }

    @PostMapping("/check/nickname")
    public ResponseDto<NicknameValidationResponseDto> checkNicknameValidation(NicknameDto nickname){
        return ResponseDto.of(NicknameValidationResponseDto.toDto(memberService.isValidNickname(nickname.getNickname())));
    }

    @GetMapping("/{nickname}")
    public ResponseDto<UserPublicInfoResponseDto> getUserPublicInfo(@PathVariable String nickname) throws Exception{
        return ResponseDto.of(UserPublicInfoResponseDto.toDto(memberService.findUserByNickname(nickname)));
    }

    @GetMapping("/info")
    public ResponseDto<UserPublicInfoResponseDto> getMyInfo(@AuthenticationPrincipal CustomUserDetails userDetails) throws Exception{
        Member member = userDetails.member();
        log.info("getMyInfo : {}", member.getNickname());
        return ResponseDto.of(UserPublicInfoResponseDto.toDto(memberService.findUserByNickname(member.getNickname())));
    }

    @GetMapping("/test")
    public ResponseDto<Void> test(){
        return ResponseDto.of(200, "test success");
    }
}
