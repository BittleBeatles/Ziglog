package com.ziglog.ziglog.domain.bookmark.controller;

import com.ziglog.ziglog.domain.bookmark.dto.request.AddBookmarkRequestDto;
import com.ziglog.ziglog.domain.bookmark.dto.response.BookmarkListDto;
import com.ziglog.ziglog.domain.bookmark.dto.response.IsBookmarkedDto;
import com.ziglog.ziglog.domain.bookmark.service.BookmarkService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{noteId}")
    public ResponseDto<Void> deleteBookmark(@AuthenticationPrincipal CustomUserDetails userDetails,
                                            @PathVariable("noteId") Long noteId) throws Exception {
        bookmarkService.deleteBookmark(userDetails.member(), noteId);
        return ResponseDto.of(200, "success");
    }

    @GetMapping("")
    public ResponseDto<BookmarkListDto> getLoginUserBookmarks(@AuthenticationPrincipal CustomUserDetails userDetails) throws Exception {
        return ResponseDto.of(BookmarkListDto.toDto(bookmarkService.getBookmarks(userDetails.member())));
    }

    @GetMapping("/{noteId}")
    public ResponseDto<IsBookmarkedDto> checkIsBookmarked(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                          @PathVariable("noteId") Long noteId) throws Exception {
        return ResponseDto.of(new IsBookmarkedDto(bookmarkService.checkIsBookmarked(userDetails.member(), noteId)));
    }

}
