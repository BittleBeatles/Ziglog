package com.ziglog.ziglog.domain.member.controller;

import com.ziglog.ziglog.domain.member.dto.response.UserPublicInfoResponseDTO;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.service.MemberService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class MemberController {

    private final MemberService memberService;

    @PutMapping("/modify/nickname")
    public ResponseEntity<String> modifyNickname(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                 String nickname) throws Exception{
        //SecurityContext 내 사용자의 닉네임을 변경시켜 줘야 함
        memberService.modifyUserNickname(userDetails.member(), nickname);
        return new ResponseEntity<>("안녕", HttpStatus.OK);
    }

    @PutMapping("/modify/profile")
    public ResponseEntity<String> modifyProfile(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                String profileUrl) throws Exception{
        Member member = userDetails.member();
        memberService.modifyUserProfile(member, profileUrl);
        return new ResponseEntity<>("안녕", HttpStatus.OK);
    }

    @PutMapping("/check/nickname")
    public ResponseEntity<Boolean> checkNicknameValidation(String nickname){
        return new ResponseEntity<>(memberService.isValidNickname(nickname), HttpStatus.OK);
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<UserPublicInfoResponseDTO> getUserPublicInfo(@PathVariable String nickname) throws Exception{
        return new ResponseEntity<>(
                UserPublicInfoResponseDTO.toDTO(memberService.findUserByNickname(nickname)),
                HttpStatus.OK
        );
    }

    @GetMapping("/info")
    public ResponseEntity<UserPublicInfoResponseDTO> getMyInfo(@AuthenticationPrincipal CustomUserDetails userDetails) throws Exception{
        Member member = userDetails.member();
        return new ResponseEntity<>(
                UserPublicInfoResponseDTO.toDTO(memberService.findUserByNickname(member.getNickname())),
                HttpStatus.OK
        );
    }

    @GetMapping("/test")
    public String test(){
        return "hello";
    }
}
