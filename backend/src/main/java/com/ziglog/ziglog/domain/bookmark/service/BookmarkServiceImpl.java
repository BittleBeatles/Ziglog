package com.ziglog.ziglog.domain.bookmark.service;

import com.ziglog.ziglog.domain.bookmark.entity.Bookmark;
import com.ziglog.ziglog.domain.bookmark.exception.exceptions.BookmarkNotFoundException;
import com.ziglog.ziglog.domain.bookmark.repository.BookmarkRepository;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.exception.exceptions.NoteNotFoundException;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BookmarkServiceImpl implements BookmarkService {

    private final MemberRepository memberRepository;
    private final NoteRepository noteRepository;
    private final BookmarkRepository bookmarkRepository;

    @Override
    public void addBookmark(Member member, Long noteId) throws UserNotFoundException {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        Member memberPersist = memberRepository.findByEmail(member.getEmail()).orElseThrow(UserNotFoundException::new);

        List<Bookmark> bookmarkList = bookmarkRepository.findAllByMember(memberPersist);
        if (bookmarkList.contains(note)) return;

        Bookmark bookmark = Bookmark.builder()
                            .member(memberPersist)
                            .note(note)
                            .build();

        bookmarkRepository.save(bookmark);
        memberPersist.getBookmarks().add(bookmark);
    }

    @Override
    public void deleteBookmark(Member member, Long noteId) throws NoteNotFoundException, UserNotFoundException, BookmarkNotFoundException{
        //persist
        Note note = noteRepository.findNoteById(noteId).orElseThrow(NoteNotFoundException::new);
        Member memberPersist = memberRepository.findByEmail(member.getEmail()).orElseThrow(UserNotFoundException::new);
        Bookmark bookmark = bookmarkRepository.findBookmarkByMemberAndNote(memberPersist, note).orElseThrow(BookmarkNotFoundException::new);

        memberPersist.getBookmarks().remove(bookmark);
        bookmarkRepository.delete(bookmark);
    }

    @Override
    public List<Bookmark> getBookmarks(Member member) throws UserNotFoundException {
        Member memberPersist = memberRepository.findByEmail(member.getEmail()).orElseThrow(UserNotFoundException::new);
        return memberPersist.getBookmarks();
    }

    @Override
    public Boolean checkIsBookmarked(Member member, Long noteId) throws UserNotFoundException {
        Member memberPersist = memberRepository.findByEmail(member.getEmail()).orElseThrow(UserNotFoundException::new);
        List<Bookmark> bookmarks = memberPersist.getBookmarks();

        for (Bookmark bookmark : bookmarks) {
            if (bookmark.getNote().getId().equals(noteId)) {
                return true;
            }
        }
        return false;
    }
}
