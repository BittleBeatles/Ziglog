package com.ziglog.ziglog.note.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.Fetch;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Directory {

    @Id
    @Column
    private Long id;

    @Column
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID")
    private Directory parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    private List<Directory> subDirectories = new ArrayList<>();

    @OneToMany(mappedBy = "directory", fetch = FetchType.LAZY)
    private List<Note> notes = new ArrayList<>();
}
