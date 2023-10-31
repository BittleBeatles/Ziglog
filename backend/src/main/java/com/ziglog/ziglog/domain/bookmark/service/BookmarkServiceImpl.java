package com.ziglog.ziglog.domain.bookmark.service;

import com.ziglog.ziglog.domain.bookmark.entity.Bookmark;
import com.ziglog.ziglog.domain.bookmark.repository.BookmarkRepository;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import com.ziglog.ziglog.domain.note.service.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Book;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BookmarkServiceImpl implements BookmarkService {

    private final NoteRepository noteRepository;
    private final BookmarkRepository bookmarkRepository;

    @Override
    public void addBookmark(Member member, Long noteId) throws Exception {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(Exception::new);

        List<Bookmark> bookmarkList = bookmarkRepository.findAllByMember(member);
        if (bookmarkList.contains(note)) return;

        Bookmark bookmark = Bookmark.builder()
                            .member(member)
                            .note(note)
                            .build();

        bookmarkRepository.save(bookmark);
        member.getBookmarks().add(bookmark);
    }

    @Override
    public void deleteBookmark(Member member, Long noteId) throws Exception {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(Exception::new);

        List<Bookmark> bookmarkList = bookmarkRepository.findAllByMember(member);
        if (!bookmarkList.contains(note)) return;

        Bookmark bookmark = bookmarkRepository.findBookmarkByMemberAndNote(member, note).orElseThrow(Exception::new);



    }

    @Override
    public List<Bookmark> getBookmarks(Member member) {
        return null;
    }

    @Override
    public Boolean checkIsBookmarked(Member member, Note noteId) {
        return null;
    }
}
