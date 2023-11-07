package com.ziglog.ziglog.global.notification.controller;

import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.global.notification.service.EmitterService;
import com.ziglog.ziglog.global.notification.service.NotificationService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
@Tag(name = "SSE 연결 및 알림을 컨트롤러")
public class NotificationController {

    private final NotificationService notificationService;
    private final EmitterService emitterService;

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(@AuthenticationPrincipal CustomUserDetails userDetails){
        return emitterService.subscribe(userDetails.member());
    }

    @DeleteMapping(value = "/delete/{notificationId}")
    public String deleteNotification(@AuthenticationPrincipal CustomUserDetails userDetails,
                                     @PathVariable Long notificationId) throws UserNotFoundException {
        notificationService.delete(userDetails.member(), notificationId);
        return "hello";
    }

}
