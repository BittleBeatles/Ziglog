package com.ziglog.ziglog.global.notification.controller;

import com.ziglog.ziglog.global.notification.service.NotificationService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class NotificationController {

    private final NotificationService notificationService;
    @GetMapping(value = "/subscribe/{id}", produces = "text/event-stream")
    public SseEmitter subscribe(@PathVariable Long id){
        return notificationService.subscribe(id);
    }

    @PostMapping("/send/{id}")
    public void sendData(@PathVariable  Long id) throws IOException {
        notificationService.notifyEvent(id, "hello");
    }

}
