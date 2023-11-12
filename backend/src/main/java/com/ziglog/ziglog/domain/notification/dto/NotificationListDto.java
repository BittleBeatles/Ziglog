package com.ziglog.ziglog.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class NotificationListDto {
    private List<NotificationDto> nontificationList;
}
