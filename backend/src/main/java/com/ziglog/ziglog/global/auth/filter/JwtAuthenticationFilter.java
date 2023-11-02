package com.ziglog.ziglog.global.auth.filter;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import com.ziglog.ziglog.global.auth.repository.RefreshTokenRepository;
import com.ziglog.ziglog.global.auth.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    private static final String REFRESH_URL = "/api/auth/refresh";
    private final GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        log.info("requestURI: {}", request.getRequestURI());
        if (request.getRequestURI().equals(REFRESH_URL)){
            checkRefreshTokenAndReissueAccessToken(request, response, filterChain);
        }
        else {
            checkAccessTokenAndSaveAuthentication(request, response, filterChain);
        }

    }

    //Access Token 있는지 확인
    public void checkAccessTokenAndSaveAuthentication(HttpServletRequest request, HttpServletResponse response,
                                 FilterChain filterChain) throws ServletException, IOException {
        log.info("check access token and save auth");
        jwtService.extractAccessToken(request)
                .filter(jwtService::isAccessTokenValid)
                .flatMap(jwtService::extractEmailFromAccessToken)
                .flatMap(memberRepository::findByEmail)
                .ifPresent(this::saveAuthentication);

        filterChain.doFilter(request, response);
    }

    //Refresh Token 있는지 확인
    public void checkRefreshTokenAndReissueAccessToken(HttpServletRequest request, HttpServletResponse response,
                                                       FilterChain filterChain) throws ServletException, IOException {
        log.info("check refresh token and reissue access token");
        String refreshToken = jwtService.extractRefreshToken(request)
                            .filter(jwtService::isRefreshTokenValid)
                            .orElse(null);

        if (refreshToken == null) return;

        refreshTokenRepository.findById(refreshToken)
                .ifPresent(refreshTokenAndMember -> {
                    String  email= refreshTokenAndMember.getEmail();
                    memberRepository.findByEmail(email)
                            .ifPresent(member -> {
                                String reIssuedRefreshToken = jwtService.issueRefreshToken();
                                log.info("reissued refresh token : {}", reIssuedRefreshToken);
                                jwtService.sendAccessTokenAndRefreshToken(response, jwtService.issueAccessToken(member.getEmail()), reIssuedRefreshToken);
                                jwtService.saveRefreshToken(reIssuedRefreshToken, member.getEmail());
                            });
                });

        filterChain.doFilter(request, response);
    }

    //Authentication 저장
    @Transactional
    public void saveAuthentication(Member member){
        log.info("jwt filter - save auth : {}", member.getNickname());
        UserDetails userDetails = new CustomUserDetails(member);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                authoritiesMapper.mapAuthorities(userDetails.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

    }
}
