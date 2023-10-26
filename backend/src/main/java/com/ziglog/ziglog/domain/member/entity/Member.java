package com.ziglog.ziglog.domain.member.entity;

import com.ziglog.ziglog.domain.bookmark.Entity.Bookmark;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "USER")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "EMAIL")
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
    private List<Note> notes;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Bookmark> bookmarks;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE)
    private List<Folder> folders;

    public void setNickname(String nickname){
        this.nickname = nickname;
    }

    public void setProfileUrl(String profileUrl){
        this.profileUrl = profileUrl;
    }
}
