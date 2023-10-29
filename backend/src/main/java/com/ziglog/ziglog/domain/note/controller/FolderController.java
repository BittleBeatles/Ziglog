package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.domain.note.service.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/folder")
public class FolderController {

    private final NoteService noteService;


}
