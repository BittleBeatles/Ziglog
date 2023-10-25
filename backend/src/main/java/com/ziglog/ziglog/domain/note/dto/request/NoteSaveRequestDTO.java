package com.ziglog.ziglog.domain.note.dto.request;

import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class NoteSaveRequestDTO {
    private Long noteId;
    private String title;
    private Boolean isPublic;
    private String content;
    private List<Long> quotingNotes;
}
