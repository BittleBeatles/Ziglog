package com.ziglog.ziglog.domain.note.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ziglog.ziglog.domain.bookmark.Entity.Bookmark;
import com.ziglog.ziglog.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Note {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "brief")
    private String brief;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Member author;

    @Column(name = "is_public")
    private boolean isPublic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;

    //공개하면 저장이 게시가 되고, 비공개 선택하면 그냥 저장. 따로 수정 게시 여부나 수정 게시 시간을 표시하지는 않음.
    @Column(name = "post_datetime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime postDatetime;

    @Column(name = "save_datetime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime saveDatetime;

    @OneToMany(mappedBy = "note", cascade = CascadeType.REMOVE)
    private List<Bookmark> bookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "startNote")
    private Set<Quotation> quoted = new HashSet<>();

    @OneToMany(mappedBy = "endNote")
    private Set<Quotation> quoting = new HashSet<>();
}
