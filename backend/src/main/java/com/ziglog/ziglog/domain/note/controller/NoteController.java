package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.note.dto.request.note.CreateNoteRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.note.ModifyNoteRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.note.SetPublicRequestDto;
import com.ziglog.ziglog.domain.note.dto.response.IsPublicResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.QuotationListResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.ReadNoteResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.RetrieveFolderResponseDto;
import com.ziglog.ziglog.domain.note.exception.exceptions.*;
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
            description = "닉네임을 통해 해당 사용자의 개인 페이지 좌측 상단에서 볼 수 있는 폴더 + 문서를 조회")
    @GetMapping("")
    public ResponseDto<RetrieveFolderResponseDto> listNoteOf(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestParam("nickname") String nickname)
            throws UserNotFoundException, NoteNotFoundException {
        return ResponseDto.of(RetrieveFolderResponseDto.toDto(noteService.getRootFolder(nickname)));
    }

    @Operation(summary = "이 글을 인용하고 있는 글들의 목록을 불러 옴",
            description = "이 글을 인용하고 있는 글의 저자 닉네임과 글의 제목 목록을 조회")
    @GetMapping("/ref")
    public ResponseDto<QuotationListResponseDto> getNotesQuoting(@RequestParam("noteId") Long noteId) throws NoteNotFoundException{
        return ResponseDto.of(QuotationListResponseDto.toDto(noteService.getNotesQuotingThis(noteId)));
    }

    @Operation(summary = "노트 삭제",
            description = "해당 아이디의 노트를 삭제")
    @DeleteMapping("")
    public ResponseDto<Void> deleteNote(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestParam("noteId") Long noteId)
            throws InconsistentNoteOwnerException, NoteNotFoundException {
        noteService.deleteNote(userDetails.member(), noteId);
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "빈 새 노트를 생성",
            description = "비어있는 새 노트를 생성")
    @PostMapping("")
    public ResponseDto<Void> createNote(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody CreateNoteRequestDto createNoteRequestDto)
           throws UserNotFoundException, FolderNotFoundException, InconsistentFolderOwnerException {
        noteService.createNote(userDetails.member(), createNoteRequestDto.getFolderId());
        return ResponseDto.of(201, "success");
    }

    @Operation(summary = "해당 노트의 내용을 수정",
            description = "해당 노트의 내용(제목, 내용, 이 글이 인용하고 있는 글 목록)을 수정")
    @PutMapping("/{noteId}")
    public ResponseDto<Void> modifyNote(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable("noteId") Long noteId, @RequestBody ModifyNoteRequestDto modifyNoteRequestDto)
            throws NoteNotFoundException, InconsistentFolderOwnerException {
        noteService.modifyNote(userDetails.member(), modifyNoteRequestDto.toEntity(noteId));
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "노트 읽기",
            description = "해당 Id의 노트의 상세 정보를 읽어 옴")
    @GetMapping("/{noteId}")
    public ResponseDto<ReadNoteResponseDto> readNote(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable("noteId") Long noteId)
            throws NoteNotFoundException, NoAuthorizationToReadException {
        if (userDetails == null) return ResponseDto.of(ReadNoteResponseDto.toDto(noteService.readNote(null, noteId)));
        return ResponseDto.of(ReadNoteResponseDto.toDto(noteService.readNote(userDetails.member(), noteId)));
    }

    @Operation(summary = "노트 공개 여부 변경",
            description = "노트의 공개 여부를 지정해 변경함")
    @PutMapping("/{noteId}/public")
    public ResponseDto<IsPublicResponseDto> setPublic(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                      @PathVariable("noteId") Long noteId, @RequestBody SetPublicRequestDto setPublicRequestDto)
            throws InconsistentFolderOwnerException, NoteNotFoundException{
        return ResponseDto.of(IsPublicResponseDto.toDto(noteService.setPublic(userDetails.member(), noteId, setPublicRequestDto.getIsPublic()).isPublic()));
    }
}
