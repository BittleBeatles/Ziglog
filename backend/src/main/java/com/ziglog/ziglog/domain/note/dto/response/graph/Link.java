package com.ziglog.ziglog.domain.note.dto.response.graph;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class Link {
    private Long source;
    private Long target;
    private String type;
}
