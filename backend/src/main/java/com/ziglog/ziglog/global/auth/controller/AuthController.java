package com.ziglog.ziglog.global.auth.controller;

import com.ziglog.ziglog.global.auth.dto.response.RefreshResponseDto;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
@Tag(name = "인증 관련 요청 처리 컨트롤러")
public class AuthController {

    @Value("{jwt.access.header}")
    private String accessTokenHeader;

    @GetMapping("/refresh")
    @Operation(summary = "토큰 갱신 요청",
            description = "쿠키의 리프레시 토큰으로 새 액세스 토큰과 새 리프레시 토큰을 발급")

    public ResponseDto<RefreshResponseDto> refresh(HttpServletResponse response) throws Exception {
        String accessToken = response.getHeader(accessTokenHeader);
        return ResponseDto.of(new RefreshResponseDto(accessToken));
    }}
