package com.ziglog.ziglog.global.auth.entity;

import com.ziglog.ziglog.global.auth.dto.OAuth2Attributes;

import java.util.Map;

public class OAuth2GoogleUserInfo extends OAuth2UserInfo {

    public OAuth2GoogleUserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getNickname() {
        return (String) attributes.get("nickname");
    }
}
