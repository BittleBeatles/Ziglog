package com.ziglog.ziglog.domain.notification.dto;

import com.ziglog.ziglog.domain.notification.entity.Notification;
import com.ziglog.ziglog.domain.notification.entity.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {

    private Long id;
    private Long memberId;
    private String senderNickname;
    private String senderProfileUrl;
    private Long noteId;
    private String message;
    private Boolean isRead = false;
    private NotificationType type;
    private LocalDateTime dateTime;

    public static NotificationDto toDto(Notification notification){
        return NotificationDto.builder()
                .id(notification.getId())
                .memberId(notification.getReceiver().getId())
                .senderNickname(notification.getSender().getNickname())
                .senderProfileUrl(notification.getSender().getProfileUrl())
                .noteId(notification.getId())
                .message(notification.getMessage())
                .isRead(notification.getIsRead())
                .type(notification.getType())
                .dateTime(notification.getDateTime())
                .build();
    }
}
