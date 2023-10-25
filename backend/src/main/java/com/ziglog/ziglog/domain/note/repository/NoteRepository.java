package com.ziglog.ziglog.domain.note.repository;

import com.ziglog.ziglog.domain.note.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

    public Note findNoteById(Long noteId);

    public List<Note> findAllById(Long noteId);

    public void removeNoteById(Long noteId);
}
