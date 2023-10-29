package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.domain.note.dto.request.CreateFolderRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.ModifyFolderNameRequestDto;
import com.ziglog.ziglog.domain.note.service.NoteService;
import com.ziglog.ziglog.global.auth.entity.CustomUserDetails;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/folder")
public class FolderController {

    private final NoteService noteService;

    @PostMapping("")
    public ResponseDto<Void> createFolder(@AuthenticationPrincipal CustomUserDetails userDetails, CreateFolderRequestDto createFolderRequestDto) throws Exception{
        noteService.createFolder(userDetails.member(), createFolderRequestDto.toEntity());
        return ResponseDto.of(200, "success");
    }


    @PutMapping("")
    public ResponseDto<Void> modifyFolder(@AuthenticationPrincipal CustomUserDetails userDetails, ModifyFolderNameRequestDto modifyFolderNameRequestDto) throws Exception {
        noteService.modifyFolder(userDetails.member(), modifyFolderNameRequestDto.toEntity());
        return ResponseDto.of(200, "success");
    }

    @DeleteMapping("/{folderId}")
    public ResponseDto<Void> deleteFolder(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable("folderId") Long folderId) throws Exception{
        noteService.deleteNote(userDetails.member(), folderId);
        return ResponseDto.of(200, "success");
    }
}
