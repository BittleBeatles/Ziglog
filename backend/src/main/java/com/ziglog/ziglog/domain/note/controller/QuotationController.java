package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.domain.note.dto.response.QuotingIdListResponseDto;
import com.ziglog.ziglog.domain.note.dto.request.quotation.UpdateQuotationsRequestDto;
import com.ziglog.ziglog.domain.note.dto.response.QuotationListResponseDto;
import com.ziglog.ziglog.domain.note.exception.exceptions.NoteNotFoundException;
import com.ziglog.ziglog.domain.note.service.QuotationService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/quote")
@Tag(name="인용 컨트롤러")
public class QuotationController {

    private final QuotationService quotationService;

    @Operation(summary = "이 글과 연결된 글들의 목록을 불러 옴",
            description = "이 글을 인용하고 있거나, 이 글이 인용하고 있는 글의 저자 닉네임과 글의 제목 목록을 조회")
    @GetMapping("/list/{noteId}")
    public ResponseDto<QuotationListResponseDto> getNotesQuoting(@PathVariable("noteId") Long noteId) throws NoteNotFoundException {
        return ResponseDto.of(quotationService.getQuotationLists(noteId));
    }

    @Operation(summary = "글 하단 인용 리스트로 갱신",
            description = "글 하단에 있는 인용 리스트로 현재 글의 인용 리스트를 갱신함")
    @PutMapping("/quoting/{noteId}")
    public ResponseDto<Void> updateQuotations(@AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("noteId") Long noteId, @RequestBody UpdateQuotationsRequestDto requestDto) throws NoteNotFoundException {
        quotationService.updateQuotations(userDetails.member(), noteId, requestDto);
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "이 글에서 인용되고 있는 글들의 id 리스트",
                description = "글 하단 인용 리스트에 나타날 내가 인용하고 있는 글들의 id 리스트")
    @GetMapping("/quoting/{noteId}")
    public ResponseDto<QuotingIdListResponseDto> getQuotingNoteIds(@PathVariable("noteId") Long noteId) throws NoteNotFoundException {
        return ResponseDto.of(quotationService.getQuotingNoteIds(noteId));
    }


}
