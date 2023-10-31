package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.domain.note.dto.response.SearchResponseDto;
import com.ziglog.ziglog.domain.note.service.NoteService;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
@Slf4j
@Tag(name = "검색 API 관련 컨트롤러")
public class SearchController {

    private final NoteService noteService;
    @GetMapping("")
    public ResponseDto<SearchResponseDto> searchAllByTitle(@RequestParam("keyword") String keyword, @RequestParam("page") Integer page, @RequestParam("perPage") Integer perPage) throws Exception{
        //최근 글부터 보여줌
        PageRequest pageRequest = PageRequest.of(page, perPage, Sort.by("postDatetime").descending());
        return ResponseDto.of(SearchResponseDto.toDto(noteService.searchPublicNotesByTitle(keyword, pageRequest)));
    }
}
