package com.ziglog.ziglog.domain.notification.controller;

import com.ziglog.ziglog.domain.notification.dto.NotificationListDto;
import com.ziglog.ziglog.domain.notification.exception.exceptions.AlreadyRemovedNotificationException;
import com.ziglog.ziglog.domain.notification.exception.exceptions.InconsistentNotificationOwnerException;
import com.ziglog.ziglog.domain.notification.service.NotificationService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import com.ziglog.ziglog.global.auth.exception.exceptions.InvalidAccessTokenException;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
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

    @Operation(summary = "클라이언트에서 서버로의 SSE 구독 요청",
                description = "클라이언트에서 서버로 SSE 연결을 요청. EventSource polyfill을 이용해서 헤더에 토큰을 담아보내야 함")
    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(@AuthenticationPrincipal CustomUserDetails userDetails,
                                HttpServletResponse response) throws Exception {
        if (userDetails == null) throw new InvalidAccessTokenException();
        response.setHeader("X-Accel-Buffering", "no");
        return notificationService.subscribe(userDetails.member());
    }
    @Operation(summary = "전체 알림 목록을 조회",
            description = "로그인한 회원의 모든 알림 목록을 조회")
    @GetMapping()
    public ResponseDto<NotificationListDto> listNotification(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseDto.of(notificationService.getNotificationList(userDetails.member()));
    }

    @Operation(summary = "해당 알림을 목록에서 삭제",
            description = "로그인한 회원의 알림 목록 중 선택된 것을 삭제")
    @DeleteMapping("/delete/{notificationId}")
    public ResponseDto<Void> deleteNotification(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                 @PathVariable String notificationId)
            throws InconsistentNotificationOwnerException, AlreadyRemovedNotificationException {
        notificationService.delete(userDetails.member(), notificationId);
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "알림을 읽기 처리",
            description = "선택된 알림을 읽기처리 함")
    @PutMapping("/read/{notificationId}")
    public ResponseDto<Void> readNotification(@AuthenticationPrincipal CustomUserDetails userDetails,
                                              @PathVariable String notificationId)
            throws InconsistentNotificationOwnerException, AlreadyRemovedNotificationException {
        notificationService.readNotification(userDetails.member(), notificationId);
        return ResponseDto.of(200, "success");
    }
}
