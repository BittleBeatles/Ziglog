package com.ziglog.ziglog.domain.note.controller;

import com.ziglog.ziglog.global.util.dto.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/search")
@Slf4j
public class SearchController {

    @GetMapping("")
    public ResponseDto<Void> searchAllByTitle(@RequestParam("keyword") String keyword){


    }
}
