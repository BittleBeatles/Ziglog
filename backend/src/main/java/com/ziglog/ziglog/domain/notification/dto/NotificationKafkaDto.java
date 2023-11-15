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
public class NotificationKafkaDto {

    private String id;
    private Long memberId;
    private String title;
    private String senderNickname;
    private String senderProfileUrl;
    private Long noteId;

    @Builder.Default
    private Boolean isRead = false;
    private NotificationType type;
    private LocalDateTime dateTime;

    public static NotificationKafkaDto toDto(Notification notification){
        return NotificationKafkaDto.builder()
                .id(notification.getId())
                .memberId(notification.getReceiver().getId())
                .senderNickname(notification.getSender().getNickname())
                .senderProfileUrl(notification.getSender().getProfileUrl())
                .noteId(notification.getNote().getId())
                .title(notification.getTitle())
                .isRead(notification.getIsRead())
                .type(notification.getType())
                .dateTime(notification.getDateTime())
                .build();
    }
}
