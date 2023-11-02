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

    public static MyInfoResponseDto toDto(Member member) throws Exception {
        //TODO 루트 폴더 찾는 건 서비스 로직에 들어가야 함 분리하기
        return MyInfoResponseDto.builder()
                .profileUrl(member.getProfileUrl())
                .nickname(member.getNickname())
                .rootFolderId(member.getFolders().stream()
                        .filter(folder -> folder.getParent() == null)
                        .findFirst().orElseThrow(Exception::new).getId())
                .build();
    }
}
