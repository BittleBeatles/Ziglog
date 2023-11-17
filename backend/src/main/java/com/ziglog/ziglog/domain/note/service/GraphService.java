package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.note.dto.response.graph.GraphResponseDto;
import com.ziglog.ziglog.domain.note.entity.Folder;

public interface GraphService {

    GraphResponseDto retrieveParentChildOnly(Folder folder);

    GraphResponseDto retrieveNotesOf(String nickname);

}
