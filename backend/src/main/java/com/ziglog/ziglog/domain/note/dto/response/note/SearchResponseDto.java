package com.ziglog.ziglog.domain.note.dto.response.note;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Slice;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class SearchResponseDto {
    private final List<BriefNoteDto> notes;
    private final List<Long> allNoteIds;

    private SearchResponseDto(Slice<BriefNoteDto> notes, List<Long> allNoteIds){
        this.notes = notes.getContent();
        this.allNoteIds = allNoteIds;
    }

    @Getter
    @Builder
    private static class BriefNoteDto {
        private Long noteId;
        private String title;
        private String nickname;
        private String profileUrl;
        private String preview;
        private Boolean isPublic;
        private Integer bookmarkCount;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime postTime;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime editTIme;

        private static BriefNoteDto toDto (Note note){
            return BriefNoteDto.builder()
                    .noteId(note.getId())
                    .title(note.getTitle())
                    .nickname(note.getAuthor().getNickname())
                    .profileUrl(note.getAuthor().getProfileUrl())
                    .preview(note.getPreview())
                    .isPublic(note.isPublic())
                    .bookmarkCount(note.getBookmarks().size())
                    .postTime(note.getPostDatetime())
                    .editTIme(note.getEditDatetime())
                    .build();
        }
    }

    public static SearchResponseDto toDto(Slice<Note> notes, List<Long> allNoteIds){
        return new SearchResponseDto(
                notes.map(BriefNoteDto::toDto),
                allNoteIds
        );
    }
}
