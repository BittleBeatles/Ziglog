package com.ziglog.ziglog.global.auth.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    @GetMapping("/refresh")
    public ResponseEntity<String> refresh(HttpServletResponse response) throws Exception{
        return new ResponseEntity<>("refreshed", HttpStatus.OK);
    }}
