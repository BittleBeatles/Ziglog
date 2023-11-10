package com.ziglog.ziglog.domain.note.service;

import com.ziglog.ziglog.domain.note.dto.response.GraphResponseDto;
import com.ziglog.ziglog.domain.note.entity.Folder;
import com.ziglog.ziglog.domain.note.exception.exceptions.FolderNotFoundException;
import com.ziglog.ziglog.domain.note.repository.FolderRepository;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Transactional
@RequiredArgsConstructor
@Service
public class GraphServiceImpl implements GraphService {

    private final FolderRepository folderRepository;

    @Override
    public GraphResponseDto retrieveFolder(Folder folder) throws FolderNotFoundException {
        Folder folderPersist = folderRepository.findById(folder.getId()).orElseThrow(FolderNotFoundException::new);
        return GraphResponseDto.toDto(folderPersist);
    }
}
