package com.ziglog.ziglog.global.auth.entity.oauth2;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
public class OAuth2GoogleUserInfo extends OAuth2UserInfo {

    public OAuth2GoogleUserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getEmail() {
        log.info("OAuth2GoogleUserInfo - getEmail() : {} ", (String) attributes.get("email"));
        return (String) attributes.get("email");
    }

    @Override
    public String getProfileUrl(){
        return (String) attributes.get("picture");
    }

    @Override
    public String getNickname() {
        return (String) attributes.get("nickname");
    }
}
