package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Slice;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class SearchResponseDto {
    private List<BriefNoteDto> notes = new ArrayList<>();

    private SearchResponseDto(Slice<BriefNoteDto> notes){
        this.notes = notes.getContent();
    }

    @Getter
    @Builder
    private static class BriefNoteDto {
        private Long noteId;
        private String title;
        private String nickname;
        private String preview;
        private Boolean isPublic;
        private Integer bookmarkCount;
        private LocalDateTime postTime;
        private LocalDateTime editTIme;

        private static BriefNoteDto toDto (Note note){
            return BriefNoteDto.builder()
                    .noteId(note.getId())
                    .nickname(note.getAuthor().getNickname())
                    .preview(note.getBrief())
                    .isPublic(note.isPublic())
                    .bookmarkCount(note.getBookmarks().size())
                    .postTime(note.getPostDatetime())
                    .editTIme(note.getEditDatetime())
                    .build();
        }
    }

    public static SearchResponseDto toDto(Slice<Note> notes){
        return new SearchResponseDto(
                notes.map(BriefNoteDto::toDto)
        );
    }
}
