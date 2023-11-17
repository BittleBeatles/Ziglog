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
public class UserPublicInfoResponseDto {

    private String profileUrl;
    private String nickname;

    public static UserPublicInfoResponseDto toDto(Member member){
        return UserPublicInfoResponseDto.builder()
                .profileUrl(member.getProfileUrl())
                .nickname(member.getNickname())
                .build();
    }
}
