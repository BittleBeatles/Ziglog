package com.ziglog.ziglog.global.notification.entity;

import com.ziglog.ziglog.domain.member.entity.Member;
import jakarta.persistence.*;

@Entity
public class Notification {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message")//메시지
    private String message;

    @Column(name = "is_read")
    private Boolean isRead;

    @ManyToOne(fetch = FetchType.LAZY)//이 알림이 갈 곳
    private Member owner;


}
