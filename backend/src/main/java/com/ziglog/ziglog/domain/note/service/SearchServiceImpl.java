package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.dto.response.SearchResponseDto;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
@Slf4j
public class SearchServiceImpl implements SearchService {

    private final NoteRepository noteRepository;
    private final MemberRepository memberRepository;

    // 검색
    public SearchResponseDto searchNotes(String keyword, String nickname, Pageable pageable) throws Exception{
        if (nickname != null) {
            Member member = memberRepository.findByNickname(nickname).orElseThrow(UserNotFoundException::new);
            return SearchResponseDto.toDto(noteRepository.findAllByTitleContainingAndAuthor(keyword, member, pageable));
        }
        return SearchResponseDto.toDto(noteRepository.findAllByTitleContaining(keyword, pageable));
    }
}