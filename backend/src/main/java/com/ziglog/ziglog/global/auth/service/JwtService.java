package com.ziglog.ziglog.global.auth.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.global.auth.entity.RefreshToken;
import com.ziglog.ziglog.global.auth.repository.RefreshTokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class JwtService {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Integer accessTokenExpiration;

    @Value("${jwt.access.header}")
    private String accessTokenHeader;

    @Value("${jwt.refresh.header}")
    private String refreshTokenHeader;

    private static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
    private static final String BEARER = "Bearer ";

    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public String issueAccessToken(String username){
        Date now = new Date();
        return JWT.create()
                .withSubject(username)
                .withIssuedAt(now)
                .withExpiresAt(new Date(now.getTime() + accessTokenExpiration))
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Optional<String> extractAccessToken(HttpServletRequest request){
        log.info("extract access token from request header");
        return Optional.ofNullable(request.getHeader(accessTokenHeader))
                .filter(token -> token.startsWith(BEARER))
                .map(token -> token.replace(BEARER, ""));
    }

    public Optional<String> extractEmailFromAccessToken(String token){
        log.info("extract email from access token");
        return Optional.ofNullable(JWT.require(Algorithm.HMAC256(secretKey))
                .build()
                .verify(token)
                .getClaim("sub")
                .asString());
    }

    public void setAccessTokenHeader(HttpServletResponse response, String accessToken){
        log.info("send access token");
        response.setHeader(accessTokenHeader, accessToken);
    }

    public boolean isAccessTokenValid(String refreshToken){
        try {
            log.info("validate access token");
            JWT.require(Algorithm.HMAC256(secretKey)).build().verify(refreshToken);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    public String issueRefreshToken(){
        log.info("issue refresh token");
        return UUID.randomUUID().toString();
    }

    public Optional<String> extractRefreshToken(HttpServletRequest request){
        log.info("extract refresh token from cookie");
        return Optional.ofNullable(request.getCookies())
                .flatMap(cookies -> Arrays.stream(cookies)
                        .filter(e -> e.getName().equals(REFRESH_TOKEN_COOKIE_NAME))
                        .findAny())
                .map(token -> token.getValue());
    }

    public void setRefreshTokenCookie(HttpServletResponse response, String refreshToken){
        log.info("set refresh token cookie");
        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_COOKIE_NAME, refreshToken)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        response.setHeader(refreshTokenHeader, cookie.toString());
    }
    public void saveRefreshToken(String refreshToken, String email) throws UsernameNotFoundException{
        log.info("save refresh token");
        refreshTokenRepository.save(new RefreshToken(refreshToken, email));
    }

    public boolean isRefreshTokenValid (String refreshToken) {
        //Cookie로 들어온 리프레시 토큰이 Redis에 존재하는지 확인
        log.info("is refresh token valid");
        return refreshTokenRepository.existsById(refreshToken);
    }

    public void sendAccessTokenAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken){
        log.info("send access token and reresh token");
        response.setStatus(HttpServletResponse.SC_OK);
        setAccessTokenHeader(response, accessToken);
        setRefreshTokenCookie(response, refreshToken);
    }
}