package com.ziglog.ziglog.domain.note.dto.request.quotation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateQuotationsRequestDto {
    private List<Long> quotingNoteIds;
}
