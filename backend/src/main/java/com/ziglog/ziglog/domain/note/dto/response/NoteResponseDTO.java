package com.ziglog.ziglog.domain.note.dto.response;

import java.util.List;

public class NoteResponseDTO {
    private Long noteId;
    private String title;
    private String content;
    private String author;
    private Boolean isPublic;
    private Integer bookmarkCount;
    private List<BriefNoteResponseDTO> quotedList;

    //게시일, 수정일

}
