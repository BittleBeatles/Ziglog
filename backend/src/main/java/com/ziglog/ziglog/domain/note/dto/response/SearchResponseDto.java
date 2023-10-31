package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

@Getter
public class SearchResponseDto {
    private Page<BriefNoteDto> notes;

    private SearchResponseDto(Page<BriefNoteDto> notes){
        this.notes = notes;
    }

    @Builder
    @Getter
    private static class BriefNoteDto {
        private Long noteId;
        private String title;
        private String nickname;
        private String preview;
        private Boolean isPublic;
        private Integer bookmarkCount;
        private LocalDateTime postTime;
        private LocalDateTime editTIme;

        BriefNoteDto(Note note){
            this.noteId = note.getId();
            this.nickname = note.getAuthor().getNickname();
            this.preview = note.getBrief();
            this.isPublic = note.isPublic();
            this.bookmarkCount = note.getBookmarks().size();
            this.postTime = note.getPostDatetime();
            this.editTIme = note.getEditDatetime();
        }
    }

    public static SearchResponseDto toDto(Page<Note> notes){
        return new SearchResponseDto(
                notes.map(BriefNoteDto::new)
        );
    }
}
