package com.ziglog.ziglog.domain.note.repository;

import com.ziglog.ziglog.domain.note.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    Optional<Note> findNoteById(Long noteId);
    List<Note> findAllById(Long noteId);
    void removeNoteById(Long noteId);
    List<Note> findAllByTitleContainingIgnoreCaseAndPublic(String title, Boolean isPublic);

}
