package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public record QuotationListResponseDto(List<QuotationDto> quotationList) {

    @Getter
    @Builder
    private static class QuotationDto{
        private Long noteId;
        private String title;
        private String nickname;
    }

    public static QuotationListResponseDto toDto(List<Note> quotedBy) {
        List<QuotationDto> notesQuotingThis = quotedBy.stream().map(note ->
                QuotationDto.builder()
                        .noteId(note.getId())
                        .title(note.getTitle())
                        .nickname(note.getAuthor().getNickname())
                        .build()
        ).toList();
        return new QuotationListResponseDto(notesQuotingThis);
    }
}
