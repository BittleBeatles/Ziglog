package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final NoteRepository noteRepository;
    // 검색
    public Slice<Note> searchPublicNotes(String keyword, Pageable pageable) throws Exception{
        return noteRepository.findAllByTitleAndContentContaining(keyword, pageable);
    }

    public Slice<Note> searchPersonalPage(String nickname, String keyword, Pageable pageable) throws Exception{
        return noteRepository.findAllByTitleAndContentContaining(keyword, pageable);
    }
}