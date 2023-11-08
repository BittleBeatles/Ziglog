package com.ziglog.ziglog.domain.notification.entity;

import com.ziglog.ziglog.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private Boolean isRead;

    @ManyToOne(fetch = FetchType.LAZY)//이 알림이 갈 곳
    private Member owner;

    public void read(){
        this.isRead = true;
    }
}
