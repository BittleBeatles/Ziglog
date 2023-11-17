package com.ziglog.ziglog.domain.note.dto.response.graph;

import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Objects;


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

    public Node(Long id, Note note, String type){
        this.id = id;
        this.name = note.getTitle();
        this.type = type;
        this.nickname = note.getAuthor().getNickname();
        this.realId = note.getId();
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Node node = (Node) o;
        return Objects.equals(getId(), node.getId()) && Objects.equals(getName(), node.getName()) && Objects.equals(getType(), node.getType()) && Objects.equals(getNickname(), node.getNickname()) && Objects.equals(getRealId(), node.getRealId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getType(), getNickname(), getRealId());
    }
}
