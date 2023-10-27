package com.ziglog.ziglog.domain.member.dto.response;

import com.ziglog.ziglog.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserPublicInfoResponseDTO {

    private String profileUrl;
    private String nickname;

    public UserPublicInfoResponseDTO(Member member){
        this.profileUrl = member.getProfileUrl();
        this.nickname = member.getNickname();
    }
}