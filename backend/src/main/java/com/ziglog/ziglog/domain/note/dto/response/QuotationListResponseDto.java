package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Builder;
import lombok.Getter;
import org.apache.kafka.common.protocol.types.Field;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
public class QuotationListResponseDto {
    private List<QuotationDto> quotingNotes;
    private List<QuotationDto> quotedNotes;

    @Getter
    @Builder
    private static class QuotationDto{
        private Long noteId;
        private String title;
        private String nickname;
        private Boolean isPublic;
    }

    public static QuotationListResponseDto toDto(List<Note> quoting, List<Note> quoted) {
        List<QuotationDto> quotingNotes = quoting.stream().map(note ->
                QuotationDto.builder()
                        .noteId(note.getId())
                        .title(note.getTitle())
                        .nickname(note.getAuthor().getNickname())
                        .isPublic(note.isPublic())
                        .build()
        ).toList();

        List<QuotationDto> quotedNotes = quoted.stream().map(note ->
                QuotationDto.builder()
                        .noteId(note.getId())
                        .title(note.getTitle())
                        .nickname(note.getAuthor().getNickname())
                        .isPublic(note.isPublic())
                        .build()
        ).toList();

        return QuotationListResponseDto.builder()
                .quotedNotes(quotedNotes)
                .quotingNotes(quotingNotes)
                .build();
    }
}
