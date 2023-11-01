package com.ziglog.ziglog.domain.note.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Quotation {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_note_id")
    private Note startNote;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "e_note_id")
    private Note endNote;
}
