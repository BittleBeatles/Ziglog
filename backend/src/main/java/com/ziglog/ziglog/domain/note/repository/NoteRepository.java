package com.ziglog.ziglog.domain.note.repository;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long>, NoteRepositoryCustom {

    Optional<Note> findNoteById(Long noteId);
    List<Note> findAllByAuthor(Member author);
    void removeNoteById(Long noteId);
}
