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
        return Optional.ofNullable(request.getHeader(accessTokenHeader))
                .filter(token -> token.startsWith(BEARER))
                .map(token -> token.replace(BEARER, ""));
    }

    public Optional<String> extractEmailFromAccessToken(String token){
        return Optional.ofNullable(JWT.require(Algorithm.HMAC256(secretKey))
                .build()
                .verify(token)
                .getClaim("sub")
                .asString());
    }

    public void setAccessTokenHeader(HttpServletResponse response, String accessToken){
        response.setHeader(accessTokenHeader, BEARER + accessToken);
    }

    public boolean isAccessTokenValid(String refreshToken){
        try {
            JWT.require(Algorithm.HMAC256(secretKey)).build().verify(refreshToken);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    public String issueRefreshToken(){
        return UUID.randomUUID().toString();
    }

    public Optional<String> extractRefreshToken(HttpServletRequest request){
        return Optional.ofNullable(request.getCookies())
                .flatMap(cookies -> Arrays.stream(cookies)
                        .filter(e -> e.getName().equals(REFRESH_TOKEN_COOKIE_NAME))
                        .findAny())
                .map(token -> token.getValue());
    }

    public void setRefreshTokenCookie(HttpServletResponse response, String refreshToken){
        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_COOKIE_NAME, refreshToken)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        response.setHeader(refreshTokenHeader, cookie.toString());
    }
    public void saveRefreshToken(String refreshToken, Member member) throws UsernameNotFoundException{
        refreshTokenRepository.save(new RefreshToken(refreshToken, member));
    }

    public boolean isRefreshTokenValid (String refreshToken) {
        //Cookie로 들어온 리프레시 토큰이 Redis에 존재하는지 확인
        return refreshTokenRepository.existsById(refreshToken);
    }

    public void sendAccessTokenAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken){
        response.setStatus(HttpServletResponse.SC_OK);
        setAccessTokenHeader(response, accessToken);
        setRefreshTokenCookie(response, refreshToken);
    }
}