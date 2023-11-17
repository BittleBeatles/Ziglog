package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.domain.note.dto.response.graph.GraphResponseDto;
import com.ziglog.ziglog.domain.note.service.GraphService;
import com.ziglog.ziglog.domain.note.service.NoteService;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/graph")
@Tag(name="그래프 컨트롤러")
public class GraphController {

    private final NoteService noteService;
    private final GraphService graphService;
    @Operation(summary = "사용자 노트 인용 관계 그래프 조회",
            description = "닉네임으로 사용자가 소유한 노트의 인용 관계 그래프를 탐색")
    @GetMapping("/note")
    public ResponseDto<GraphResponseDto> retrieveNotesOf(@RequestParam("nickname") String nickname) throws Exception {
        return ResponseDto.of(graphService.retrieveNotesOf(nickname));
    }

    @Operation(summary = "사용자 폴더 구조 그래프 조회",
            description = "닉네임으로 사용자가 소유한 폴더 및 노트의 트리 그래프를 조회")
    @GetMapping("/folder")
    public ResponseDto<GraphResponseDto> retrieveFolderOf(@RequestParam("nickname") String nickname) throws Exception {
        return ResponseDto.of(graphService.retrieveParentChildOnly(noteService.getRootFolder(nickname)));
    }

    @Operation(summary = "모든 사용자의 노트-참조 그래프 조회",
                description = "존재하는 모든 노트의 그래프를 조회")
    @GetMapping("/note/all")
    public ResponseDto<GraphResponseDto> retrieveAllNotes() throws Exception {
        return ResponseDto.of(graphService.retrieveAllNotes());
    }
}
