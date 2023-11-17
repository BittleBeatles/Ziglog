package com.ziglog.ziglog.domain.note.dto.response.graph;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Graph {
    Set<Long> folderSet = new HashSet<>();
    Set<Long> noteSet = new HashSet<>();
    List<Node> nodes = new ArrayList<>();
    List<Link> links = new ArrayList<>();


}
