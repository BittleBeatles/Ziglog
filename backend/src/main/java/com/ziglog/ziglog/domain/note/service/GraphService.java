package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.note.dto.response.GraphResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.graph.Graph;
import com.ziglog.ziglog.domain.note.entity.Folder;

public interface GraphService {

    GraphResponseDto retrieveParentChildOnly(Folder folder);

}
