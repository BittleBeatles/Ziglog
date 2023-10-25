package com.ziglog.ziglog.domain.note.repository;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FolderRepository extends JpaRepository<Folder, Long> {

    public void deleteById(Long folderId);

    public List<Folder> findAllByOwner(Member owner); //해당 사용자의 모든 디렉토리를 반환
}
