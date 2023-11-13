package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.note.dto.request.folder.ChangeFolderParentRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.folder.CreateFolderRequestDto;
import com.ziglog.ziglog.domain.note.dto.request.folder.ModifyFolderNameRequestDto;
import com.ziglog.ziglog.domain.note.dto.response.folder.RetrieveFolderOnlyResponseDto;
import com.ziglog.ziglog.domain.note.exception.exceptions.CannotRemoveRootFolderException;
import com.ziglog.ziglog.domain.note.exception.exceptions.FolderNotFoundException;
import com.ziglog.ziglog.domain.note.exception.exceptions.InconsistentFolderOwnerException;
import com.ziglog.ziglog.domain.note.exception.exceptions.InconsistentNoteOwnerException;
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
@RequestMapping("/folder")
@Tag(name="폴더 컨트롤러")
public class FolderController {

    private final NoteService noteService;

    @Operation(summary = "폴더 생성",
            description = "폴더 이름과 부모 폴더를 바탕으로 새로운 폴더를 생성")
    @PostMapping("")
    public ResponseDto<Void> createFolder(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody CreateFolderRequestDto createFolderRequestDto)
            throws FolderNotFoundException, InconsistentNoteOwnerException, UserNotFoundException {
        noteService.createFolder(userDetails.member(), createFolderRequestDto);
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "폴더명 변경",
            description = "해당 폴더의 이름을 변경")
    @PutMapping("")
    public ResponseDto<Void> modifyFolder(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody ModifyFolderNameRequestDto modifyFolderNameRequestDto)
            throws InconsistentFolderOwnerException, FolderNotFoundException {
        noteService.modifyFolder(userDetails.member(), modifyFolderNameRequestDto);
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "폴더 삭제",
            description = "해당 폴더를 삭제")
    @DeleteMapping("/{folderId}")
    public ResponseDto<Void> deleteFolder(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable("folderId") Long folderId)
            throws FolderNotFoundException, UserNotFoundException, InconsistentFolderOwnerException, CannotRemoveRootFolderException {
        noteService.deleteFolder(userDetails.member(), folderId);
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "폴더의 부모를 변경",
            description = "폴더의 부모를 변경함")
    @PutMapping("/parent")
    public ResponseDto<Void> changeParentFolder(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                @RequestBody ChangeFolderParentRequestDto requestDto) {
        noteService.changeFolderParent(userDetails.member(), requestDto);
        return ResponseDto.of(200, "success");
    }

    @Operation(summary = "회원의 모든 폴더 리스트를 반환",
            description = "로그인한 회원의 폴더 리스트를 보여줌")
    @GetMapping("/{folderId}")
    public ResponseDto<RetrieveFolderOnlyResponseDto> searchAllFolder(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                                      @PathVariable Long folderId) {
        return ResponseDto.of(noteService.listFolders(userDetails.member().getNickname(), folderId));
    }
}
