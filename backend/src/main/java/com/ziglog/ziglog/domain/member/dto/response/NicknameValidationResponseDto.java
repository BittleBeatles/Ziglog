package com.ziglog.ziglog.domain.member.dto.response;

import lombok.Getter;

@Getter
public class NicknameValidationResponseDto {
    Boolean isValid;
    private NicknameValidationResponseDto(Boolean isValid){
        this.isValid = isValid;
    }

    public static NicknameValidationResponseDto toDto(Boolean isValid){
        return new NicknameValidationResponseDto(isValid);
    }
}
