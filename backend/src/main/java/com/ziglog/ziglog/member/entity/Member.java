package com.ziglog.ziglog.member.entity;

import com.ziglog.ziglog.bookmark.Entity.Bookmark;
import com.ziglog.ziglog.note.entity.Note;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;

import java.util.List;

@Entity
public class Member {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String nickname;

    @Column
    private String email;

    @Column
    private String password;

    @Column (columnDefinition = "varchar(32) default 'GUEST'")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column
    private String profileUrl;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<Note> notes;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Bookmark> bookmarks;

}
