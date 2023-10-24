package com.ziglog.ziglog.global.auth.dto;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.global.auth.entity.OAuth2GoogleUserInfo;
import com.ziglog.ziglog.global.auth.entity.OAuth2UserInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuth2Attributes {

    private String nameAttributeKey;
    private OAuth2UserInfo oAuth2UserInfo;

    @Builder
    public OAuth2Attributes(String nameAttributeKey, OAuth2UserInfo oAuth2UserInfo){
        this.nameAttributeKey = nameAttributeKey;
        this.oAuth2UserInfo = oAuth2UserInfo;
    }

    public static OAuth2Attributes of(RegistrationId clientName, String nameAttributeKey, Map<String, Object> attributes){
        if (clientName == RegistrationId.google) return ofGoogle(nameAttributeKey, attributes);
        return null;
    }

   private static OAuth2Attributes ofGoogle(String nameAttributeKey, Map<String, Object> attributes){
        return OAuth2Attributes.builder()
                .nameAttributeKey(nameAttributeKey)
                .oAuth2UserInfo(new OAuth2GoogleUserInfo(attributes))
                .build();
    }

    public Member toEntity(){
        return Member.builder()
                .email(oAuth2UserInfo.getEmail())
                .nickname(oAuth2UserInfo.getNickname())
                .build();
    }

}
