package com.ziglog.ziglog.bookmark.Entity;

import com.ziglog.ziglog.member.entity.Member;
import com.ziglog.ziglog.note.entity.Note;
import jakarta.persistence.*;

@Entity
public class Bookmark {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTE_ID", nullable = false)
    private Note note;
}
