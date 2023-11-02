package com.ziglog.ziglog.domain.bookmark.controller;

import com.ziglog.ziglog.domain.bookmark.dto.request.AddBookmarkRequestDto;
import com.ziglog.ziglog.domain.bookmark.dto.response.BookmarkListDto;
import com.ziglog.ziglog.domain.bookmark.dto.response.IsBookmarkedDto;
import com.ziglog.ziglog.domain.bookmark.service.BookmarkService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmark")
@Slf4j
@Tag(name = "북마크 기능을 위한 컨트롤러")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @Operation(summary = "해당 글을 내 북마크에 추가",
            description = "해당 노트를 내 북마크에 추가합니다.")
    @PostMapping("")
    public ResponseDto<Void> addBookmark(@AuthenticationPrincipal CustomUserDetails userDetails,
                                         @RequestBody AddBookmarkRequestDto addBookmarkRequestDto) throws Exception {
        bookmarkService.addBookmark(userDetails.member(), addBookmarkRequestDto.getNoteId());
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "북마크 삭제",
            description = "해당 글을 내 북마크 목록에서 삭제합니다")
    @DeleteMapping("/{noteId}")
    public ResponseDto<Void> deleteBookmark(@AuthenticationPrincipal CustomUserDetails userDetails,
                                            @PathVariable("noteId") Long noteId) throws Exception {
        bookmarkService.deleteBookmark(userDetails.member(), noteId);
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "북마크 목록 조회",
            description = "내 북마크 목록을 조회합니다.")
    @GetMapping("")
    public ResponseDto<BookmarkListDto> getLoginUserBookmarks(@AuthenticationPrincipal CustomUserDetails userDetails) throws Exception {
        return ResponseDto.of(BookmarkListDto.toDto(bookmarkService.getBookmarks(userDetails.member())));
    }

    @Operation(summary = "북마크 확인",
            description = "해당 글이 내가 북마크한 글인지의 여부를 확인합니다.")
    @GetMapping("/{noteId}")
    public ResponseDto<IsBookmarkedDto> checkIsBookmarked(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                          @PathVariable("noteId") Long noteId) throws Exception {
        return ResponseDto.of(new IsBookmarkedDto(bookmarkService.checkIsBookmarked(userDetails.member(), noteId)));
    }

}
