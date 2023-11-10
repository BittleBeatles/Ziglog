package com.ziglog.ziglog.domain.note.repository;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Note;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    Optional<Note> findNoteById(Long noteId);
    List<Note> findAllByAuthor(Member author);
    void removeNoteById(Long noteId);

    //TODO : QueryDSL를 이용해서 최적화할 필요가 있음. 글 내용으로 검색할 수도 있어야 함
    Slice<Note> findAllByTitleContainingAndAuthor(String keyword, Member author, Pageable pageable);
    Slice<Note> findAllByTitleContaining(String keyword, Pageable pageable);
}
