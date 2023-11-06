package com.ziglog.ziglog.domain.bookmark.service;

import com.ziglog.ziglog.domain.bookmark.entity.Bookmark;
import com.ziglog.ziglog.domain.bookmark.exception.exceptions.BookmarkNotFoundException;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.note.exception.exceptions.NoteNotFoundException;

import java.util.List;

public interface BookmarkService {

    //북마크 추가
    void addBookmark(Member member, Long noteId) throws UserNotFoundException;
    //북마크 삭제
    void deleteBookmark(Member member, Long noteId) throws NoteNotFoundException, UserNotFoundException, BookmarkNotFoundException;

    //북마크 가져오기
    List<Bookmark> getBookmarks(Member member) throws UserNotFoundException;
    //이 글이 북마크 된 글인지 확인
    Boolean checkIsBookmarked(Member member, Long noteId) throws UserNotFoundException;

}
