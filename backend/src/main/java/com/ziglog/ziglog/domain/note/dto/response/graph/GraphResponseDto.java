package com.ziglog.ziglog.domain.note.dto.response.graph;

import lombok.Getter;

import java.util.Set;

@Getter
public class GraphResponseDto {

    private Set<Node> nodes;
    private Set<Link> links;

    public GraphResponseDto(Set<Node> nodes, Set<Link> links){
        this.nodes = nodes;
        this.links = links;
    }
}
