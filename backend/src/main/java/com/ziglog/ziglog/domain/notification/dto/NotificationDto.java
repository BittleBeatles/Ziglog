package com.ziglog.ziglog.domain.notification.dto;

import com.ziglog.ziglog.domain.member.entity.Member;
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
    private String message;
    private Boolean isRead = false;
    private Long memberId;
    private NotificationType type;
    private LocalDateTime dateTime;

    public static NotificationDto toDto(Notification notification){
        return NotificationDto.builder()
                .id(notification.getId())
                .message(notification.getMessage())
                .isRead(notification.getIsRead())
                .memberId(notification.getOwner().getId())
                .type(notification.getType())
                .dateTime(notification.getDateTime())
                .build();
    }

    public Notification toEntity(Member owner){
        return Notification.builder()
                .message(message)
                .isRead(false)
                .owner(owner)
                .type(this.type)
                .dateTime(dateTime)
                .build();
    }
}
