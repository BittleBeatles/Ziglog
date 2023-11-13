package com.ziglog.ziglog.domain.note.dto.response.folder;

import com.ziglog.ziglog.domain.note.entity.Folder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FolderBriefDto {
    private Long id;
    private String title;

    public static FolderBriefDto toDto(Folder folder){
        return new FolderBriefDto(folder.getId(), folder.getTitle());
    }
}
