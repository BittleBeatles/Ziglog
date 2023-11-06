package com.ziglog.ziglog.domain.note.dto.response;

import lombok.Getter;

@Getter
public class IsPublicResponseDto {
    private Boolean isPublic;

    private IsPublicResponseDto(Boolean isPublic){
        this.isPublic = isPublic;
    }

    public static IsPublicResponseDto toDto(Boolean isPublic){
        return new IsPublicResponseDto(isPublic);
    }
}
