package com.ziglog.ziglog.global.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.global.auth.entity.oauth2.CustomOAuth2User;
import com.ziglog.ziglog.global.auth.service.CustomOAuth2UserService;
import com.ziglog.ziglog.global.auth.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final MemberRepository memberRepository;

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();


    @Value("${base-url.frontend}")
    private String frontUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        try {
            log.info("OAuth2LoginSuccessHandler - onAuthenticationSuccess()");
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            log.info("OAuth2LoginSuccessHandler - onAuthenticationSuccess(1)");
            loginSuccess(request, response, oAuth2User);
        } catch (Exception e){
            log.info("OAuth2LoginSuccessHandler - onAuthenticationSuccess() fails : {}", e.getMessage());
        }
    }

    private void loginSuccess(HttpServletRequest request, HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        if (response.isCommitted()) return;

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        String accessToken = jwtService.issueAccessToken(oAuth2User.getName());
        String refreshToken = jwtService.issueRefreshToken();

        String redirectUrl = UriComponentsBuilder.fromUriString(frontUrl + "/oauth?at=" + accessToken)
                .build().toUriString();

        jwtService.saveRefreshToken(refreshToken, oAuth2User.getMember().getEmail());
        redirectStrategy.sendRedirect(request, response, redirectUrl);
    }
}
