package com.ziglog.ziglog.domain.note.entity;

import com.ziglog.ziglog.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Folder {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID")
    @Builder.Default
    private Folder parent = null;

    @Builder.Default
    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    private List<Folder> children = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "folder", fetch = FetchType.LAZY)
    private List<Note> notes = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Member owner;

    public void setTitle(String title){
        this.title = title;
    }
    public void setParent(Folder parent) {
        this.parent = parent;
    }

}