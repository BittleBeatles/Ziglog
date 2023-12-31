package com.ziglog.ziglog.domain.member.dto.response;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Folder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MyInfoResponseDto {

    private String profileUrl;
    private String nickname;
    private Long rootFolderId;

    public static MyInfoResponseDto toDto(Member member, Folder folder) {
        return MyInfoResponseDto.builder()
                .profileUrl(member.getProfileUrl())
                .nickname(member.getNickname())
                .rootFolderId(folder.getId())
                .build();
    }
}
