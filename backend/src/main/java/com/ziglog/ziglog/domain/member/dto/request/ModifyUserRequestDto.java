package com.ziglog.ziglog.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ModifyUserRequestDto {
    private String nickname;
    private String profileUrl;
}
