package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public record QuotationListResponseDto(List<QuotingThisNoteDto> quotationList) {
    @Getter
    @Builder
    private static class QuotingThisNoteDto {
        private Long noteId;
        private String title;
        private String nickname;
    }

    public static QuotationListResponseDto toDto(List<Note> quotedBy) {
        List<QuotingThisNoteDto> notesQuotingThis = quotedBy.stream().map(note ->
                QuotingThisNoteDto.builder()
                        .noteId(note.getId())
                        .title(note.getTitle())
                        .nickname(note.getAuthor().getNickname())
                        .build()
        ).toList();
        return new QuotationListResponseDto(notesQuotingThis);
    }
}
