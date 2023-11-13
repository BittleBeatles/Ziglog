package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.note.dto.response.folder.SearchResponseDto;
import org.springframework.data.domain.Pageable;


public interface SearchService {//추후 최적화를 위해 분리된 서비스로 제공
    // 검색
    SearchResponseDto searchNotes(String keyword, String nickname, Pageable pageable) throws Exception;
}