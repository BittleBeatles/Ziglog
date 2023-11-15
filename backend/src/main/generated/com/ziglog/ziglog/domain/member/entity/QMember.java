package com.ziglog.ziglog.domain.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 184563662L;

    public static final QMember member = new QMember("member1");

    public final ListPath<com.ziglog.ziglog.domain.bookmark.entity.Bookmark, com.ziglog.ziglog.domain.bookmark.entity.QBookmark> bookmarks = this.<com.ziglog.ziglog.domain.bookmark.entity.Bookmark, com.ziglog.ziglog.domain.bookmark.entity.QBookmark>createList("bookmarks", com.ziglog.ziglog.domain.bookmark.entity.Bookmark.class, com.ziglog.ziglog.domain.bookmark.entity.QBookmark.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final ListPath<com.ziglog.ziglog.domain.note.entity.Folder, com.ziglog.ziglog.domain.note.entity.QFolder> folders = this.<com.ziglog.ziglog.domain.note.entity.Folder, com.ziglog.ziglog.domain.note.entity.QFolder>createList("folders", com.ziglog.ziglog.domain.note.entity.Folder.class, com.ziglog.ziglog.domain.note.entity.QFolder.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath nickname = createString("nickname");

    public final ListPath<com.ziglog.ziglog.domain.note.entity.Note, com.ziglog.ziglog.domain.note.entity.QNote> notes = this.<com.ziglog.ziglog.domain.note.entity.Note, com.ziglog.ziglog.domain.note.entity.QNote>createList("notes", com.ziglog.ziglog.domain.note.entity.Note.class, com.ziglog.ziglog.domain.note.entity.QNote.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final StringPath profileUrl = createString("profileUrl");

    public final EnumPath<Role> role = createEnum("role", Role.class);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

