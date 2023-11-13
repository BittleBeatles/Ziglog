package com.ziglog.ziglog.domain.bookmark.service;

import com.ziglog.ziglog.domain.bookmark.dto.request.AddBookmarkRequestDto;
import com.ziglog.ziglog.domain.bookmark.dto.response.BookmarkListDto;
import com.ziglog.ziglog.domain.bookmark.dto.response.IsBookmarkedDto;
import com.ziglog.ziglog.domain.bookmark.entity.Bookmark;
import com.ziglog.ziglog.domain.bookmark.exception.exceptions.BookmarkAlreadyExistsException;
import com.ziglog.ziglog.domain.bookmark.exception.exceptions.BookmarkNotFoundException;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.exception.exceptions.NoteNotFoundException;
import com.ziglog.ziglog.domain.notification.entity.Notification;

import java.util.List;

public interface BookmarkService {

    IsBookmarkedDto checkIsBookmarked(Member member, Long noteId) throws UserNotFoundException;
    //북마크 가져오기
    BookmarkListDto getBookmarkedNotes(Member member) throws UserNotFoundException;
    //북마크 추가
    void addBookmark(Member member, AddBookmarkRequestDto addBookmarkRequestDto) throws UserNotFoundException, NoteNotFoundException, BookmarkAlreadyExistsException, Exception;
    //북마크 삭제
    void deleteBookmark(Member member, Long noteId) throws NoteNotFoundException, UserNotFoundException, BookmarkNotFoundException;
    //이 글이 북마크 된 글인지 확인
    Boolean isBookmarked(Member member, Long noteId) throws UserNotFoundException;
}
