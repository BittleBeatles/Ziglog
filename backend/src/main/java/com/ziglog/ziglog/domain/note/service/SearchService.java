package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.note.entity.Note;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface SearchService {//추후 최적화를 위해 분리된 서비스로 제공
    // 검색
    Slice<Note> searchPublicNotes(String keyword, Pageable pageable) throws Exception;

    Slice<Note> searchPersonalPage(String nickname, String keyword, Pageable pageable) throws Exception;
}