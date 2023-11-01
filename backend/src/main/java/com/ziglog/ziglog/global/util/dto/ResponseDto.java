package com.ziglog.ziglog.global.util.dto;

import lombok.Getter;

@Getter
public class ResponseDto<T> {
    private Integer statusCode;
    private String message;
    private T data;
    private ResponseDto(Integer statusCode, String message){
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
    }

    private ResponseDto(Integer statusCode, String message, T data){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    public static <T> ResponseDto<T> of(Integer statusCode, String message) {
        return new ResponseDto<>(statusCode, message);
    }

    public static <T> ResponseDto<T> of(Integer statusCode, String message, T data){
        return new ResponseDto<>(statusCode, message, data);
    }

    public static <T> ResponseDto<T> of(T data){
        return new ResponseDto<>(200, "success", data);
    }
}
