package com.ziglog.ziglog.domain.notification.dto;

import lombok.Getter;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@Getter
public class NotificationResponseDto {

    private final String id;
    private final String senderNickname;
    private final String senderProfileUrl;
    private final String receiverNickname;
    private final Long noteId;
    private final String title;
    private final Boolean isRead;
    private final String type;
    private final String dateTime;

    public NotificationResponseDto(NotificationKafkaDto notificationKafkaDto){
        this.id = notificationKafkaDto.getId();
        this.senderNickname = notificationKafkaDto.getSenderNickname();
        this.receiverNickname = notificationKafkaDto.getReceiverNickname();
        this.senderProfileUrl = notificationKafkaDto.getSenderProfileUrl();
        this.noteId = notificationKafkaDto.getNoteId();
        this.title = notificationKafkaDto.getTitle();
        this.isRead = notificationKafkaDto.getIsRead();
        this.type = notificationKafkaDto.getType().name();
        this.dateTime = notificationKafkaDto.getDateTime().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM));
    }
}
