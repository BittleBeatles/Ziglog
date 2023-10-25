package com.ziglog.ziglog.domain.note.repository;

import com.ziglog.ziglog.domain.note.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
