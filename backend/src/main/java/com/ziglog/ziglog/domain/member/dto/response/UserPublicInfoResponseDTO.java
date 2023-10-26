package com.ziglog.ziglog.domain.member.dto.response;

import com.ziglog.ziglog.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserPublicInfoResponseDTO {

    private String profileUrl;
    private String nickname;

    public static UserPublicInfoResponseDTO toDTO(Member member){
        return UserPublicInfoResponseDTO.builder()
                .profileUrl(member.getProfileUrl())
                .nickname(member.getNickname())
                .build();
    }
}
