package com.ziglog.ziglog.domain.note.entity;

import jakarta.persistence.*;

@Entity
public class Quotation {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_note_id")
    private Note startNote;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "e_note_id")
    private Note endNote;

}
