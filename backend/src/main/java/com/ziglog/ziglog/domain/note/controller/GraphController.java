package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.domain.note.dto.response.GraphResponseDto;
import com.ziglog.ziglog.domain.note.service.NoteService;
import com.ziglog.ziglog.global.util.dto.ResponseDto;
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

    @GetMapping("")
    public ResponseDto<GraphResponseDto> getGraphByNickname(@RequestParam("nickname") String nickname) throws Exception {
        return ResponseDto.of(GraphResponseDto.toDto(noteService.getRootFolder(nickname)));
    }
}
