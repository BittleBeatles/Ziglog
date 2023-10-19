package com.ziglog.ziglog.note.entity;

import com.ziglog.ziglog.member.entity.Member;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
public class Note {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String title;

    @Column
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member author;

    @Column
    private boolean isPublic;

    @CreationTimestamp
    @Column
    private LocalDateTime writeTime;

    @UpdateTimestamp
    @Column
    private LocalDateTime updateTime;

    //이 글을 참조하고 있는 글 목록

    //이 글이 참조하고 있는 글 목록

    //이 글을 북마크 한 사람들


}
