package com.ziglog.ziglog.domain.member.dto.response;

public class NicknameValidationResponseDto {

    Boolean isValid;
    private NicknameValidationResponseDto(Boolean isValid){
        this.isValid = isValid;
    }

    public static NicknameValidationResponseDto toDto(Boolean isValid){
        return new NicknameValidationResponseDto(isValid);
    }
}
