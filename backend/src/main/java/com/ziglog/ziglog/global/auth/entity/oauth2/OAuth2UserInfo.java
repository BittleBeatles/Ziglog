package com.ziglog.ziglog.global.auth.entity.oauth2;

import java.util.Map;

public abstract class OAuth2UserInfo {
    Map<String, Object> attributes;
    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    public abstract String getEmail();
    public abstract String getProfileUrl();
    public abstract String getNickname();
}
