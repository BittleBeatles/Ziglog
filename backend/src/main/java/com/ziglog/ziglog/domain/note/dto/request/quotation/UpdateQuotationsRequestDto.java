package com.ziglog.ziglog.domain.note.dto.request.quotation;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class UpdateQuotationsRequestDto {
    List<Long> quotingNoteIds;
}
