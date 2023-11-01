package com.ziglog.ziglog.domain.bookmark.dto.response;

import com.ziglog.ziglog.domain.bookmark.entity.Bookmark;
import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Builder;
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

        BookmarkedNoteInfo(Bookmark bookmark){
            Note note = bookmark.getNote();
            this.noteId = note.getId();
            this.title = note.getTitle();
            this.nickname = note.getAuthor().getNickname();
        }
    }

    public static BookmarkListDto toDto(List<Bookmark> bookmarks) {
        return new BookmarkListDto(bookmarks.stream().map(BookmarkedNoteInfo::new).toList());
    }
}