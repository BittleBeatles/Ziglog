package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.dto.response.graph.GraphResponseDto;
import com.ziglog.ziglog.domain.note.dto.response.graph.Link;
import com.ziglog.ziglog.domain.note.dto.response.graph.Node;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import com.ziglog.ziglog.domain.note.exception.exceptions.FolderNotFoundException;
import com.ziglog.ziglog.domain.note.repository.FolderRepository;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Transactional
@RequiredArgsConstructor
@Service
public class GraphServiceImpl implements GraphService {

    private final FolderRepository folderRepository;
    private final NoteRepository noteRepository;
    private final MemberRepository memberRepository;

    @Override
    public GraphResponseDto retrieveParentChildOnly(Folder folder) throws FolderNotFoundException {
        Folder folderPersist = folderRepository.findById(folder.getId()).orElseThrow(FolderNotFoundException::new);

        Map<Long, Long> noteMap = new HashMap<>();
        Map<Long, Long> folderMap = new HashMap<>();
        Set<Node> nodeSet = new HashSet<>();
        Set<Link> linkSet = new HashSet<>();

        folderMap.put(folderPersist.getId(), 1L);
        nodeSet.add(new Node(1L, folderPersist));
        treeSearch(folderPersist, noteMap, folderMap, nodeSet, linkSet);

        return new GraphResponseDto(nodeSet, linkSet);
    }

    private void treeSearch(Folder parent, Map<Long, Long> noteMap, Map<Long, Long> folderMap, Set<Node> nodeSet, Set<Link> linkSet){
        Long parentId = folderMap.get(parent.getId());
        for (Folder child : parent.getChildren()){
            if (folderMap.containsKey(child.getId())) continue;
            Long idx = folderMap.size() + noteMap.size() + 1L;
            folderMap.put(child.getId(), idx);
            nodeSet.add(new Node(idx, child));
            linkSet.add(new Link(parentId, idx, "parentChild"));
            treeSearch(child, noteMap, folderMap, nodeSet, linkSet);
        }
        for (Note child : parent.getNotes()){
            if (noteMap.containsKey(child.getId())) continue;
            Long idx = folderMap.size() + noteMap.size() + 1L;
            noteMap.put(child.getId(), idx);
            nodeSet.add(new Node(idx, child));
            linkSet.add(new Link(parentId, idx, "parentChild"));
        }
    }

    @Override
    public GraphResponseDto retrieveNotesOf(String nickname) throws UserNotFoundException {
        Member member = memberRepository.findByNickname(nickname).orElseThrow(UserNotFoundException::new);
        List<Note> notes = noteRepository.findAllByAuthor(member);
        //notes를 모두 노드화하고
        //각 노드에서 나가는 간선들을 모두 붙여줌
        Map<Long, Long> noteToNode = new HashMap<>();

        Set<Node> nodeSet = new HashSet<>();
        Set<Link> linkSet = new HashSet<>();

        notes.forEach(note -> {
            Long idx = noteToNode.size() + 1L;
            noteToNode.put(note.getId(), idx);
            nodeSet.add(new Node(idx, note));
        });

        //각 노트들과 이어진 다른 노트들과의 관계를 본다
        notes.forEach(note -> {
            List<Note> prev = note.getQuoting().stream().map(Quotation::getStartNote).toList();
            for (Note startNote : prev) {
                if (!noteToNode.containsKey(startNote.getId())) {
                    Long idx = noteToNode.size() + 1L;
                    noteToNode.put(startNote.getId(), idx);
                    nodeSet.add(new Node(idx, startNote));
                }
                Long source = noteToNode.get(startNote.getId());
                Long target = noteToNode.get(note.getId());

                linkSet.add(new Link(source, target, "link"));

                List<Note> next = note.getQuoted().stream().map(Quotation::getEndNote).toList();

                for (Note endNote : next) {
                    if (!noteToNode.containsKey(endNote.getId())) {
                        Long idx = noteToNode.size() + 1L;
                        noteToNode.put(endNote.getId(), idx);
                        nodeSet.add(new Node(idx, note));
                    }
                    source = noteToNode.get(note.getId());
                    target = noteToNode.get(endNote.getId());

                    linkSet.add(new Link(source, target, "link"));
                }
            }
        });
        return new GraphResponseDto(nodeSet, linkSet);
    }
}
