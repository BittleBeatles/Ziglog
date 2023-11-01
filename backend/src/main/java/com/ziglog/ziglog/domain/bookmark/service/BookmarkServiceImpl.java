package com.ziglog.ziglog.domain.bookmark.service;

import com.ziglog.ziglog.domain.bookmark.entity.Bookmark;
import com.ziglog.ziglog.domain.bookmark.repository.BookmarkRepository;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.entity.Note;
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
    public void addBookmark(Member member, Long noteId) throws Exception {
        Note note = noteRepository.findNoteById(noteId).orElseThrow(Exception::new);
        Member memberPersist = memberRepository.findByEmail(member.getEmail()).orElseThrow(Exception::new);

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
    public void deleteBookmark(Member member, Long noteId) throws Exception {
        //persist
        Note note = noteRepository.findNoteById(noteId).orElseThrow(Exception::new);
        Member memberPersist = memberRepository.findByEmail(member.getEmail()).orElseThrow(Exception::new);
        Bookmark bookmark = bookmarkRepository.findBookmarkByMemberAndNote(memberPersist, note).orElseThrow(Exception::new);

        memberPersist.getBookmarks().remove(bookmark);
        bookmarkRepository.delete(bookmark);
    }

    @Override
    public List<Bookmark> getBookmarks(Member member) throws Exception {
        Member memberPersist = memberRepository.findByEmail(member.getEmail()).orElseThrow(Exception::new);
        return memberPersist.getBookmarks();
    }

    @Override
    public Boolean checkIsBookmarked(Member member, Long noteId) throws Exception {
        Member memberPersist = memberRepository.findByEmail(member.getEmail()).orElseThrow(Exception::new);
        List<Bookmark> bookmarks = memberPersist.getBookmarks();

        for (Bookmark bookmark : bookmarks) {
            if (bookmark.getNote().getId().equals(noteId)) {
                return true;
            }
        }
        return false;
    }
}
