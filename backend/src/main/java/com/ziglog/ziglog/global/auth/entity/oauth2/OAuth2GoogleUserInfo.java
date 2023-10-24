package com.ziglog.ziglog.global.auth.entity.oauth2;

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
    public String getProfileUrl(){
        return (String) attributes.get("picture");
    }

    @Override
    public String getNickname() {
        return (String) attributes.get("nickname");
    }
}
