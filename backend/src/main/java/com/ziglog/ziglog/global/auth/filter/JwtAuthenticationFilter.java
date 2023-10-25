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
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String REFRESH_URL = "/api/refresh";

    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        if (request.getRequestURI().equals(REFRESH_URL)){
            checkRefreshTokenAndReissueAccessToken(request, response, filterChain);
            return;
        }

        checkAccessTokenAndSaveAuthentication(request, response, filterChain);
    }

    //Access Token 있는지 확인
    public void checkAccessTokenAndSaveAuthentication(HttpServletRequest request, HttpServletResponse response,
                                 FilterChain filterChain) throws ServletException, IOException {
        jwtService.extractAccessToken(request)
                .filter(jwtService::isAccessTokenValid)
                .ifPresent(accessToken -> jwtService.extractEmailFromAccessToken(accessToken)
                        .ifPresent(email-> memberRepository.findMemberByEmail(email)
                                .ifPresent(this::saveAuthentication)));
        filterChain.doFilter(request, response);
    }

    //Refresh Token 있는지 확인
    public void checkRefreshTokenAndReissueAccessToken(HttpServletRequest request, HttpServletResponse response,
                                                       FilterChain filterChain) throws ServletException, IOException {

        String refreshToken = jwtService.extractRefreshToken(request)
                            .filter(jwtService::isRefreshTokenValid)
                            .orElse(null);

        if (refreshToken == null) return;

        refreshTokenRepository.findById(refreshToken)
                .ifPresent(refreshTokenAndMember -> {
                    Member member = refreshTokenAndMember.getMember();
                    String reIssuedRefreshToken = jwtService.issueRefreshToken();
                    jwtService.sendAccessTokenAndRefreshToken(response,
                            jwtService.issueAccessToken(member.getEmail()),
                             reIssuedRefreshToken
                    );
                    jwtService.saveRefreshToken(reIssuedRefreshToken, member);
                });
    }

    //Authentication 저장
    public void saveAuthentication(Member member){
        //OAuth2만 쓸까? 말까? 쓸까? 말까? 샤워하고 올까? 말까? 올까? 말까?
        UserDetails userDetails = new CustomUserDetails(member);

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                authoritiesMapper.mapAuthorities(userDetails.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
