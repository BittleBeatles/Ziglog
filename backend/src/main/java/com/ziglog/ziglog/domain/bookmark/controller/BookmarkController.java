package com.ziglog.ziglog.domain.bookmark.controller;

import com.ziglog.ziglog.domain.bookmark.dto.request.AddBookmarkRequestDto;
import com.ziglog.ziglog.domain.bookmark.service.BookmarkService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmark")
@Slf4j
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("")
    public ResponseDto<Void> addBookmark(@AuthenticationPrincipal CustomUserDetails userDetails,
                                         @RequestBody AddBookmarkRequestDto addBookmarkRequestDto) throws Exception {
        bookmarkService.addBookmark(userDetails.member(), addBookmarkRequestDto.getNoteId());
        return ResponseDto.of(200, "success");
    }



}
