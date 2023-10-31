package com.ziglog.ziglog.domain.note.dto.response;

import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
public class GraphResponseDto {
    Set<Long> folderSet = new HashSet<>();
    Set<Long> noteSet = new HashSet<>();

    //노드와 간선으로 이루어짐
    //인풋으로는 루트 폴더
    //리턴은 요거 두 개만 나가면 되는데?
    //이건 DTO가 할 일을 아득히 넘어가 있음 => 어디다 넣을지는 고민해보기
    List<Node> nodes = new ArrayList<>();
    List<Link> links = new ArrayList<>();

    private GraphResponseDto(Folder root){
        retrieve(root);
    }

    @Getter
    private static class Node {
        private final Long id;
        private final String name;
        private final String type;
        private final String nickname;
        private final Long realId;

        private Node(Long id, Folder folder) {
            this.id = id;
            this.name = folder.getTitle();
            this.type = "folder";
            this.nickname = folder.getOwner().getNickname();
            this.realId = folder.getId();
        }

        private Node(Long id, Note note){
            this.id = id;
            this.name = note.getTitle();
            this.type = "note";
            this.nickname = note.getAuthor().getNickname();
            this.realId = note.getId();
        }
    }

    @Builder
    @Getter
    private static class Link {
        private Long source;
        private Long target;
        private String type;
    }

    public static GraphResponseDto toDto(Folder root){
        return new GraphResponseDto(root);
    }

    private Node retrieve(Folder folder){//부모자식 관계만 있음
        if (folderSet.contains(folder.getId())) return null; //이미 노드로 들어갔으면 없앰
        folderSet.add(folder.getId());
        Long nodeId = (long) folderSet.size() + noteSet.size();
        Node node = new Node(nodeId, folder);
        nodes.add(node);

        for (Folder child : folder.getChildren()){
            Node childAsNode = retrieve(child);
            if (childAsNode != null) {
                links.add(
                        Link.builder()
                                .source(node.getId())
                                .target(childAsNode.getId())
                                .type("parentChild")
                                .build()
                );
            }
        }

        for (Note child : folder.getNotes()){
            Node childAsNode = retrieve(child);
            if (childAsNode != null) {
                links.add(
                        Link.builder()
                                .source(node.getId())
                                .target(childAsNode.getId())
                                .type("parentChild")
                                .build()
                );
            }
        }

        return node;
    }

    private Node retrieve(Note note){//인용 관계만 있음
        if (noteSet.contains(note.getId())) return null;
        noteSet.add(note.getId());
        Long nodeId = (long) folderSet.size() + noteSet.size();
        Node node = new Node(nodeId, note);
        nodes.add(node);

        for (Quotation quotation: note.getQuoted()){
            Note child = quotation.getEndNote();
            Node childAsNode = retrieve(child);
            if (childAsNode != null) {
                links.add(
                        Link.builder()
                                .source(node.getId())
                                .target(childAsNode.getId())
                                .type("quotation")
                                .build()
                );
            }
        }
        return node;
    }
}
