package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

public class QuotationListResponseDto {
    private List<QuotingThisNoteDto> quotationList;
    @Getter
    @Builder
    private static class QuotingThisNoteDto {
        private Long noteId;
        private String title;
        private String nickname;
    }

    public QuotationListResponseDto(List<QuotingThisNoteDto> quotationList){
        this.quotationList = quotationList;
    }

    public static QuotationListResponseDto toDto(Note note){
        List<Quotation> quotedBy = note.getQuoted();
        List<QuotingThisNoteDto> notesQuotingThis = quotedBy.stream().map(quotation ->
                QuotingThisNoteDto.builder()
                        .noteId(quotation.getEndNote().getId())
                        .title(quotation.getEndNote().getTitle())
                        .nickname(quotation.getEndNote().getAuthor().getNickname())
                        .build()
        ).toList();
        return new QuotationListResponseDto(notesQuotingThis);
    }
}
