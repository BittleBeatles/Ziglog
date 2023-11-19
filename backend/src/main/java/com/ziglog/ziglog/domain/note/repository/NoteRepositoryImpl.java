package com.ziglog.ziglog.domain.note.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import java.util.ArrayList;
import java.util.List;

import static com.ziglog.ziglog.domain.note.entity.QNote.note;

@RequiredArgsConstructor
public class NoteRepositoryImpl implements NoteRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Slice<Note> searchByKeyword(String keyword, Member member, String nickname, Pageable pageable){

        String keywordWithNoWhiteSpace = keyword.replace(" ", "");

        //내가 페이지의 주인이면 전체 검색하고, 아니면 공개 자료만 검색한다.
        List<Note> result = queryFactory
                .selectFrom(note)
                .where(isOwner(member, nickname), matches(keywordWithNoWhiteSpace))
                .orderBy(getOrderSpecifiers().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        boolean hasNext = false;
        if (result.size() > pageable.getPageSize()) {
            result.remove(pageable.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(result, pageable, hasNext);
    }

    @Override
    public List<Long> searchAllNoteIdByKeyword(String keyword) {

        String keywordWithNoWhiteSpace = keyword.replace(" ", "");
        List<Long> result = queryFactory
                .select(note.id)
                .from(note)
                .where(matches(keywordWithNoWhiteSpace))
                .orderBy(getOrderSpecifiers().toArray(OrderSpecifier[]::new))
                .fetch();

       return result;
    }


    private BooleanExpression isOwner(Member member, String nickname){
        //공개만 가져온다
        if (nickname == null){
            return note.isPublic;//전체 검색

        }
        else if (member == null || !member.getNickname().equals(nickname)){
            return note.isPublic.and(note.author.nickname.eq(nickname));//타인의 개인 페이지 검색
        }
        else {
            return note.author.nickname.eq(nickname);//자신의 개인 페이지 검색
        }
    }

    private BooleanBuilder matches(String keyword){

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.or(Expressions.stringTemplate("function('lower', {0})", note.content).contains(keyword));
        booleanBuilder.or(Expressions.stringTemplate("function('lower', {0})", note.title).contains(keyword));

        return booleanBuilder;
    }

    private List<OrderSpecifier> getOrderSpecifiers(){
        List<OrderSpecifier> orderSpecifiers = new ArrayList<>();

        orderSpecifiers.add(new OrderSpecifier(Order.DESC, note.quoted.size()));
        orderSpecifiers.add(new OrderSpecifier(Order.DESC, note.bookmarks.size()));
        orderSpecifiers.add(new OrderSpecifier(Order.DESC, note.postDatetime));

        return orderSpecifiers;
    }
}
