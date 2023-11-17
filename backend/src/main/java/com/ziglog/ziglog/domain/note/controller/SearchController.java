package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.dto.response.note.SearchResponseDto;
import com.ziglog.ziglog.domain.note.service.SearchService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
@Slf4j
@Tag(name = "검색 API 관련 컨트롤러")
public class SearchController {

    private final SearchService searchService;
    @GetMapping("")
    public ResponseDto<SearchResponseDto> searchAllByTitle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam("keyword") String keyword,
            @RequestParam(name = "nickname", required = false) String nickname,
            @RequestParam("page") Integer page, @RequestParam("perPage") Integer perPage) throws Exception{
        //최근 글부터 보여줌
        PageRequest pageRequest = PageRequest.of(page, perPage);
        Member member = (userDetails == null ? null : userDetails.member());
        return ResponseDto.of(searchService.searchNotes(member, keyword, nickname, pageRequest));
    }
}
