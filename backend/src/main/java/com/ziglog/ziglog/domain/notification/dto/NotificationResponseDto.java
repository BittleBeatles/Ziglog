package com.ziglog.ziglog.domain.notification.dto;

import lombok.Getter;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@Getter
public class NotificationResponseDto {
    private Long id;
    private String senderNickname;
    private String senderProfileUrl;
    private Long noteId;
    private String title;
    private Boolean isRead = false;
    private String type;
    private String dateTime;

    public NotificationResponseDto(NotificationDto notificationDto){
        this.id = notificationDto.getId();
        this.senderNickname = notificationDto.getSenderNickname();
        this.senderProfileUrl = notificationDto.getSenderProfileUrl();
        this.noteId = notificationDto.getNoteId();
        this.title = notificationDto.getTitle();
        this.isRead = notificationDto.getIsRead();
        this.type = notificationDto.getType().name();
        this.dateTime = notificationDto.getDateTime().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM));
    }
}
