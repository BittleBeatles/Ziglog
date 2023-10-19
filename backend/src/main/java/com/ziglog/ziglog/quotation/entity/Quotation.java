package com.ziglog.ziglog.quotation.entity;

import com.ziglog.ziglog.member.entity.Member;
import com.ziglog.ziglog.note.entity.Note;
import jakarta.persistence.*;

@Entity
public class Quotation {

    @Id
    @Column
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTE_ID", nullable = false)
    private Note quoted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTE_ID", nullable = false)
    private Note quoting;
}
