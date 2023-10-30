package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.domain.note.dto.request.CreateNoteRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.ModifyNoteRequestDto;
import com.ziglog.ziglog.domain.note.dto.response.ListFolderResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.QuotationListResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.ReadNoteResponseDto;
import com.ziglog.ziglog.domain.note.service.NoteService;
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
@RequestMapping("/note")
@Tag(name="노트 컨트롤러")
public class NoteController {

    private final NoteService noteService;

    @Operation(summary = "사용자의 문서를 조회",
            description = "닉네임을 통해 해당 사용자의 개인 페이지 좌측 상단에서 볼 수 있는 폴더 + 문서를 조회"
    )
    @GetMapping("")
    public ResponseDto<ListFolderResponseDto> listNoteOf(@RequestParam("nickname") String nickname) throws Exception {
        return ResponseDto.of(ListFolderResponseDto.toDto(noteService.listFolder(nickname)));
    }

    @Operation(summary = "이 글을 인용하고 있는 글들의 목록을 불러 옴",
            description = "이 글을 인용하고 있는 글의 저자 닉네임과 글의 제목 목록을 조회"
    )
    @GetMapping("/ref")
    public ResponseDto<QuotationListResponseDto> getNotesQuoting(@RequestParam("noteId") Long noteId) throws Exception{
        return ResponseDto.of(QuotationListResponseDto.toDto(noteService.getNote(noteId)));
    }

    @Operation(summary = "노트 삭제",
            description = "해당 아이디의 노트를 삭제"
    )
    @DeleteMapping("")
    public ResponseDto<Void> deleteNote(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestParam("noteId") Long noteId) throws Exception {
        noteService.deleteNote(userDetails.member(), noteId);
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "빈 새 노트를 생성",
            description = "비어있는 새 노트를 생성"
    )
    @PostMapping("")
    public ResponseDto<Void> createNote(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody CreateNoteRequestDto createNoteRequestDto) throws Exception{
        noteService.createNote(userDetails.member(), createNoteRequestDto.getFolderId());
        return ResponseDto.of(201, "success");
    }

    @Operation(summary = "해당 노트의 내용을 수정",
            description = "해당 노트의 내용(제목, 내용, 이 글이 인용하고 있는 글 목록)을 수정"
    )
    @PutMapping("/{noteId}")
    public ResponseDto<Void> modifyNote(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable("noteId") Long noteId, @RequestBody ModifyNoteRequestDto modifyNoteRequestDto) throws Exception {
        noteService.modifyNote(userDetails.member(), modifyNoteRequestDto.toEntity(userDetails.member(), noteId));
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "노트 읽기",
            description = "해당 Id의 노트의 상세 정보를 읽어 옴"
    )
    @GetMapping("/{noteId}")
    public ResponseDto<ReadNoteResponseDto> readNote(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable("noteId") Long noteId) throws Exception {
        //TODO 이 사용자가 해당 노트를 읽을 수 있는지 없는지 확인하는 로직이 필요
        return ResponseDto.of(ReadNoteResponseDto.toDTO(noteService.getNote(noteId)));
    }
}
