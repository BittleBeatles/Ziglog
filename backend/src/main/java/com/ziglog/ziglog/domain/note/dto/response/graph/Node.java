package com.ziglog.ziglog.domain.note.dto.response.graph;

import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Builder
@Getter
@AllArgsConstructor
public class Node {
    private final Long id;
    private final String name;
    private final String type;
    private final String nickname;
    private final Long realId;

    public Node(Long id, Folder folder) {
        this.id = id;
        this.name = folder.getTitle();
        this.type = "folder";
        this.nickname = folder.getOwner().getNickname();
        this.realId = folder.getId();
    }

    public Node(Long id, Note note){
        this.id = id;
        this.name = note.getTitle();
        this.type = "note";
        this.nickname = note.getAuthor().getNickname();
        this.realId = note.getId();
    }
}
