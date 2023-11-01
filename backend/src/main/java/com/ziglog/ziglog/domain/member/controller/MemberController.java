package com.ziglog.ziglog.domain.member.controller;

import com.ziglog.ziglog.domain.member.dto.request.ModifyUserRequestDto;
import com.ziglog.ziglog.domain.member.dto.request.NicknameDto;
import com.ziglog.ziglog.domain.member.dto.response.MyInfoResponseDto;
import com.ziglog.ziglog.domain.member.dto.response.NicknameValidationResponseDto;
import com.ziglog.ziglog.domain.member.dto.response.UserPublicInfoResponseDto;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.service.MemberService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@Slf4j
@Tag(name="회원 관리 컨트롤러")
public class MemberController {

    private final MemberService memberService;

    @PutMapping("/modify")
    @Operation(summary = "현재 로그인한 회원 정보를 수정",
                description = "현재 로그인한 회원의 닉네임과 프로필 사진을 변경 및 저장"
    )
    public ResponseDto<UserPublicInfoResponseDto> modifyUserInfo(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                                 @RequestBody ModifyUserRequestDto userRequestDto) throws Exception{
        Member member = userDetails.member();
        memberService.modifyUserNickname(member, userRequestDto.getNickname());
        memberService.modifyUserProfile(member, userRequestDto.getProfileUrl());
        return ResponseDto.of(UserPublicInfoResponseDto.toDto(memberService.findUserByEmail(member.getEmail())));
    }

    @Operation(summary = "사용 가능한 닉네임인지 확인",
            description = "닉네임은 1자 이상 12자 이하로, 알파벳 대소문자, 숫자, 갖춘 한글로만 구성되어야 함"
    )
    @PostMapping("/check/nickname")
    public ResponseDto<NicknameValidationResponseDto> checkNicknameValidation(@RequestBody NicknameDto nickname){
        return ResponseDto.of(NicknameValidationResponseDto.toDto(memberService.isValidNickname(nickname.getNickname())));
    }

    @Operation(summary = "닉네임으로 공개 정보를 조회",
            description = "닉네임으로 해당 사용자의 닉네임과 프로필 이미지 주소를 조회"
    )
    @GetMapping("/{nickname}")
    public ResponseDto<UserPublicInfoResponseDto> getUserPublicInfo(@PathVariable String nickname) throws Exception{
        return ResponseDto.of(UserPublicInfoResponseDto.toDto(memberService.findUserByNickname(nickname)));
    }

    @Operation(summary = "현재 로그인한 회원의 공개 정보를 조회",
            description = "액세스 토큰을 기반으로 현재 로그인한 사용자의 닉네임과 프로필 이미지 주소를 조회"
    )
    @GetMapping("/info")
    public ResponseDto<MyInfoResponseDto> getMyInfo(@AuthenticationPrincipal CustomUserDetails userDetails) throws Exception{
        return ResponseDto.of(MyInfoResponseDto.toDto(memberService.findUserByEmail(userDetails.member().getEmail())));
    }

    @GetMapping("/test")
    public ResponseDto<Void> test(){
        return ResponseDto.of(200, "test success");
    }
}
