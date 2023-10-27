package com.ziglog.ziglog.domain.member.entity;

import com.ziglog.ziglog.domain.bookmark.Entity.Bookmark;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "MEMBER")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "EMAIL", unique = true)
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "NICKNAME")
    private String nickname;

    @Column(name = "PROFILE_URL")
    private String profileUrl;

    @Column (name = "ROLE")
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<Note> notes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<Bookmark> bookmarks = new ArrayList<>();;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<Folder> folders = new ArrayList<>();

    public void setNickname(String nickname){
        this.nickname = nickname;
    }

    public void setProfileUrl(String profileUrl){
        this.profileUrl = profileUrl;
    }
}
