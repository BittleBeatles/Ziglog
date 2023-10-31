package com.ziglog.ziglog.domain.note.repository;

import com.ziglog.ziglog.domain.note.entity.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    Optional<Note> findNoteById(Long noteId);
    List<Note> findAllById(Long noteId);
    void removeNoteById(Long noteId);
    Slice<Note> findAllByTitleContainingIgnoreCaseAndIsPublic(String title, Boolean isPublic, Pageable pageable);
}
