package com.ziglog.ziglog.domain.note.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SearchRequestDto {
    private Integer page;
    private Integer perPage;
}
