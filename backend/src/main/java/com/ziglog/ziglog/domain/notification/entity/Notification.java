package com.ziglog.ziglog.domain.notification.entity;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.entity.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message")//메시지
    private String message;

    @Column(name = "is_read")
    @Builder.Default
    private Boolean isRead = false;

    @ManyToOne(fetch = FetchType.LAZY)//이 알림이 갈 곳
    @JoinColumn(name = "member_id", nullable = false)
    private Member owner;

    @Column (name = "type")
    @Enumerated(EnumType.STRING)
    private NotificationType type;

    @Column(name = "date_time")
    LocalDateTime dateTime;

    public void read(){
        this.isRead = true;
    }
}
