package com.ziglog.ziglog.global.auth.entity.oauth2;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
public class OAuth2KakaoUserInfo extends OAuth2UserInfo {

    private final Map<String, Object> account;
    private final Map<String, Object> profile;

    public OAuth2KakaoUserInfo(Map<String, Object> attributes) {
        super(attributes);
        this.account = (Map<String, Object>) attributes.get("kakao_account");
        profile = (Map<String, Object>) account.get("profile");
    }

    @Override
    public String getNickname() {
        if (account == null || profile == null) return null;
        return (String) profile.get("nickname");
    }

    @Override
    public String getProfileUrl() {
        if (account == null || profile == null) return null;
        return (String) profile.get("profile_image_url");
    }

    @Override
    public String getEmail() {
        return String.valueOf(account.get("email"));
    }
}
