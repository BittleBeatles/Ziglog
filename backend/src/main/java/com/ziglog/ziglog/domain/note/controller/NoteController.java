package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.dto.request.CreateNoteRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.ModifyNoteRequestDto;
import com.ziglog.ziglog.domain.note.dto.response.ListFolderResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.QuotationListResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.ReadNoteResponseDto;
import com.ziglog.ziglog.domain.note.service.NoteService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/note")
public class NoteController {

    private final NoteService noteService;

    @GetMapping("")
    public ResponseDto<ListFolderResponseDto> listNoteOf(@RequestParam("nickname") String nickname) throws Exception {
        return ResponseDto.of(ListFolderResponseDto.toDto(noteService.listFolder(nickname)));
    }

    @GetMapping("/ref")
    public ResponseDto<QuotationListResponseDto> getNotesQuoting(@RequestParam("note_id") Long noteId) throws Exception{
        return ResponseDto.of(QuotationListResponseDto.toDto(noteService.getNote(noteId)));
    }

    @DeleteMapping("")
    public ResponseDto<Void> deleteNote(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestParam("note_id") Long noteId) throws Exception {
        noteService.deleteNote(userDetails.member(), noteId);
        return ResponseDto.of(200, "success");
    }

    @PostMapping("")
    public ResponseDto<Void> createNote(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody CreateNoteRequestDto createNoteRequestDto) throws Exception{
        noteService.createNote(userDetails.member(), createNoteRequestDto.getFolderId());
        return ResponseDto.of(201, "success");
    }

    @PutMapping("/{noteId}")
    public ResponseDto<Void> modifyNote(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable("noteId") Long noteId, @RequestBody ModifyNoteRequestDto modifyNoteRequestDto) throws Exception {
        noteService.modifyNote(userDetails.member(), modifyNoteRequestDto.toEntity(userDetails.member(), noteId));
        return ResponseDto.of(200, "success");
    }

    @GetMapping("/{noteId")
    public ResponseDto<ReadNoteResponseDto> readNote(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable("noteId") Long noteId) throws Exception {
        return ResponseDto.of(ReadNoteResponseDto.toDTO(noteService.getNote(noteId)));
    }

}
