package com.ziglog.ziglog.note.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ziglog.ziglog.bookmark.Entity.Bookmark;
import com.ziglog.ziglog.member.entity.Member;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Column
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime postDateTime;

    @Column
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime saveDateTime;

    @OneToMany(mappedBy = "note", cascade = CascadeType.REMOVE)
    private List<Bookmark> bookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "quoted", cascade = CascadeType.REMOVE)
    private List<Quotation> quotedList = new ArrayList<>();

    @OneToMany(mappedBy = "quoting", cascade = CascadeType.REMOVE)
    private List<Quotation> quotingList = new ArrayList<>();
}
