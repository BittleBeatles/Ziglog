package com.ziglog.ziglog.domain.note.repository;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Note;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface NoteRepositoryCustom {
    Slice<Note> searchByKeyword(String keyword, Member member, String nickname, Pageable pageable);
    List<Long> searchAllNoteIdByKeyword(String keyword);
}