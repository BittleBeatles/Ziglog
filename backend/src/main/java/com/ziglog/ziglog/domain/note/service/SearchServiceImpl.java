package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.dto.response.note.SearchResponseDto;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
@Slf4j
public class SearchServiceImpl implements SearchService {

    private final NoteRepository noteRepository;

    // 검색
    public SearchResponseDto searchNotes(Member member, String keyword, String nickname, Pageable pageable) throws Exception{
        return SearchResponseDto.toDto(noteRepository.searchByKeyword(keyword, member, nickname, pageable),
                noteRepository.searchAllNoteIdByKeyword(keyword)
        );
    }
}