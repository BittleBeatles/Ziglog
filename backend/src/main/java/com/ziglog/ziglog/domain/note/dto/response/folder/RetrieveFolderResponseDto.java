package com.ziglog.ziglog.domain.note.dto.response.folder;

import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.global.util.AlphanumericComparator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Getter
public class RetrieveFolderResponseDto {
    private List<Node> folderList;

    private RetrieveFolderResponseDto(Folder folder){
        Node root = new Node(folder);
        this.folderList = root.getNotes();
    }

    @Builder
    @Getter
    @AllArgsConstructor
    private static class Node {

        @Builder.Default
        private Comparator<String> comparator = new AlphanumericComparator();
        private String type;
        private Long id;
        private String title;
        private List<Node> notes;
        private Boolean isPublic;

        Node(Folder folder) {
            this.type = "folder";
            this.id = folder.getId();
            this.title = folder.getTitle();
            this.isPublic = true;
            List<Node> children = new ArrayList<>(folder.getChildren().stream().sorted((o1, o2) -> comparator.compare(o1.getTitle(), o2.getTitle())).map(Node::new).toList());
            List<Node> subNotes = new ArrayList<>(folder.getNotes().stream().sorted((o1, o2) -> comparator.compare(o1.getTitle(), o2.getTitle())).map(Node::new).toList());
            children.addAll(subNotes);
            this.notes = children;
        }

        Node(Note note) {
            this.type = "note";
            this.id = note.getId();
            this.title = note.getTitle();
            this.isPublic = note.isPublic();
            this.notes = new ArrayList<>();
        }
    }

    public static RetrieveFolderResponseDto toDto(Folder folder) {
        return new RetrieveFolderResponseDto(folder);
    }
}

