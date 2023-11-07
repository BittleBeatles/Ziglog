package com.ziglog.ziglog.global.alarm.controller;

import com.ziglog.ziglog.global.alarm.service.AlarmService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping(value = "/subscribe", produces = "text/event-steream")
    public SseEmitter subscribe(@AuthenticationPrincipal CustomUserDetails userDetails){
        return new SseEmitter();
    }
}
