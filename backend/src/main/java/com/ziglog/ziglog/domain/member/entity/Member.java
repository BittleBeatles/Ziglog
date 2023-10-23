package com.ziglog.ziglog.domain.member.entity;

import com.ziglog.ziglog.domain.bookmark.Entity.Bookmark;
import com.ziglog.ziglog.domain.note.entity.Directory;
import com.ziglog.ziglog.domain.note.entity.Note;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Entity
@Table(name = "USER")
@Getter
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

    @Column (columnDefinition = "varchar(32) default 'GUEST'", name = "ROLE")
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<Note> notes;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Bookmark> bookmarks;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE)
    private List<Directory> directories;
}
