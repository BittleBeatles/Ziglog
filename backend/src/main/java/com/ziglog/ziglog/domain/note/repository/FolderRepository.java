package com.ziglog.ziglog.domain.note.repository;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    void deleteById(Long folderId);

    Optional<Folder> findById(Long id);

    List<Folder> findAllByOwner(Member owner); //해당 사용자의 모든 디렉토리를 반환
    Optional<Folder> findByOwnerAndParent(Member owner, Folder parent);

}
