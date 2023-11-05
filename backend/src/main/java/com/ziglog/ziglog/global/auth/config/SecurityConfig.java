package com.ziglog.ziglog.global.auth.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.global.auth.filter.JwtAuthenticationFilter;
import com.ziglog.ziglog.global.auth.handler.OAuth2LoginFailureHandler;
import com.ziglog.ziglog.global.auth.handler.OAuth2LoginSuccessHandler;
import com.ziglog.ziglog.global.auth.repository.RefreshTokenRepository;
import com.ziglog.ziglog.global.auth.service.CustomOAuth2UserService;
import com.ziglog.ziglog.global.auth.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${jwt.access.header}")
    private String accessTokenHeader;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Value("${base-url.frontend}")
    private String frontUrl;

    private static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration corsConfig = new CorsConfiguration();

        corsConfig.addAllowedOrigin(frontUrl);
        corsConfig.setAllowCredentials(true);
        corsConfig.addAllowedHeader("*");
        corsConfig.addAllowedMethod("*");
        corsConfig.addExposedHeader(accessTokenHeader);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }

    @Bean
    public SecurityFilterChain httpFilterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic(AbstractHttpConfigurer::disable)
                .cors(cors ->
                        cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .requiresChannel(requiresChannel -> requiresChannel
                        .requestMatchers(new AntPathRequestMatcher("/auth/oauth2/authorization")).requiresSecure()
                )
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .anyRequest().permitAll()
                )
                .oauth2Login((oauth2login) ->
                        oauth2login
                                .loginPage("/login")
                                .successHandler(oAuth2LoginSuccessHandler)
                                .failureHandler(oAuth2LoginFailureHandler)
                                .authorizationEndpoint((endpoint) -> endpoint
                                        .baseUri("/auth/oauth2/authorization"))
                                .redirectionEndpoint((endpoint) ->
                                        endpoint.baseUri("/login/oauth2/code/*"))
                                .userInfoEndpoint((endpoint) ->
                                        endpoint.userService(customOAuth2UserService))
                )
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .logoutSuccessHandler(((request, response, authentication) -> { return; }))
                        .invalidateHttpSession(true)
                        .deleteCookies(REFRESH_TOKEN_COOKIE_NAME)
                )
                .exceptionHandling(handling -> handling
                        .authenticationEntryPoint((request, response, authException) -> {response.setStatus(401);})
                );

        http.addFilterAfter(jwtAuthenticationFilter(), LogoutFilter.class);
        return http.build();
    }

    public JwtAuthenticationFilter jwtAuthenticationFilter() throws Exception{
        return new JwtAuthenticationFilter(jwtService, memberRepository, refreshTokenRepository);
    }

}