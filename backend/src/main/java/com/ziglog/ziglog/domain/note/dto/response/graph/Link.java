package com.ziglog.ziglog.domain.note.dto.response.graph;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Objects;

@Getter
@AllArgsConstructor
@Builder
public class Link {
    private Long source;
    private Long target;
    private String type;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Link link = (Link) o;
        return Objects.equals(getSource(), link.getSource()) && Objects.equals(getTarget(), link.getTarget()) && Objects.equals(getType(), link.getType());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSource(), getTarget(), getType());
    }
}
