package com.ziglog.ziglog.domain.bookmark.dto.response;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class BookmarkListDto {
    List<BookmarkedNoteInfo> notes = new ArrayList<>();

    private BookmarkListDto(List<BookmarkedNoteInfo> notes){
        this.notes = notes;
    }

    @Getter
    private static class BookmarkedNoteInfo {
        private Long noteId;
        private String title;
        private String nickname;
        private Boolean isPublic;

        BookmarkedNoteInfo(Note note){
            this.noteId = note.getId();
            this.title = note.getTitle();
            this.nickname = note.getAuthor().getNickname();//Lazy => 바뀌어야 됨
            this.isPublic = note.isPublic();
        }
    }

    public static BookmarkListDto toDto(List<Note> bookmarkedNotes) {
        return new BookmarkListDto(bookmarkedNotes.stream().map(BookmarkedNoteInfo::new).toList());
    }
}
