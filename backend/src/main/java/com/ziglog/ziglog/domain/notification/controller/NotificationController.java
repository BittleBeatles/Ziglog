package com.ziglog.ziglog.domain.notification.controller;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.member.service.MemberService;
import com.ziglog.ziglog.domain.notification.service.EmitterService;
import com.ziglog.ziglog.domain.notification.service.NotificationService;
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
    //TODO 임시
    private final MemberRepository memberRepository;

    @GetMapping(value = "/subscribe/{userId}", produces = "text/event-stream")
    public SseEmitter subscribe(@PathVariable(name = "userId") Long userId) throws Exception {
        Member member = memberRepository.findById(userId).orElseThrow(Exception::new);
        return emitterService.subscribe(member);
    }

    @DeleteMapping(value = "/delete/{notificationId}")
    public String deleteNotification(@AuthenticationPrincipal CustomUserDetails userDetails,
                                     @PathVariable Long notificationId) throws UserNotFoundException {
        notificationService.delete(userDetails.member(), notificationId);
        return "hello";
    }

}
