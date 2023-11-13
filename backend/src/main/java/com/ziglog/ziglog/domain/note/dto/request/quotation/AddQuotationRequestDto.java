package com.ziglog.ziglog.domain.note.dto.request.quotation;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddQuotationRequestDto {
    private Long startNoteIdx;
    private Long endNoteIdx;
}
