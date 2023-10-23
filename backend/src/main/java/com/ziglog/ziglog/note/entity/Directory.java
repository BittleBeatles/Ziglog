package com.ziglog.ziglog.note.entity;

import com.ziglog.ziglog.member.entity.Member;
import jakarta.persistence.*;
import jakarta.persistence.criteria.Fetch;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Directory {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID")
    private Directory parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    private List<Directory> children = new ArrayList<>();

    @OneToMany(mappedBy = "directory", fetch = FetchType.LAZY)
    private List<Note> notes = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    private Member owner;
}
