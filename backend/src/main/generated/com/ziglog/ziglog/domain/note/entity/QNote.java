package com.ziglog.ziglog.domain.note.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNote is a Querydsl query type for Note
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNote extends EntityPathBase<Note> {

    private static final long serialVersionUID = -348395842L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNote note = new QNote("note");

    public final com.ziglog.ziglog.domain.member.entity.QMember author;

    public final ListPath<com.ziglog.ziglog.domain.bookmark.entity.Bookmark, com.ziglog.ziglog.domain.bookmark.entity.QBookmark> bookmarks = this.<com.ziglog.ziglog.domain.bookmark.entity.Bookmark, com.ziglog.ziglog.domain.bookmark.entity.QBookmark>createList("bookmarks", com.ziglog.ziglog.domain.bookmark.entity.Bookmark.class, com.ziglog.ziglog.domain.bookmark.entity.QBookmark.class, PathInits.DIRECT2);

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> editDatetime = createDateTime("editDatetime", java.time.LocalDateTime.class);

    public final QFolder folder;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isPublic = createBoolean("isPublic");

    public final DateTimePath<java.time.LocalDateTime> postDatetime = createDateTime("postDatetime", java.time.LocalDateTime.class);

    public final StringPath preview = createString("preview");

    public final ListPath<Quotation, QQuotation> quoted = this.<Quotation, QQuotation>createList("quoted", Quotation.class, QQuotation.class, PathInits.DIRECT2);

    public final ListPath<Quotation, QQuotation> quoting = this.<Quotation, QQuotation>createList("quoting", Quotation.class, QQuotation.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    public QNote(String variable) {
        this(Note.class, forVariable(variable), INITS);
    }

    public QNote(Path<? extends Note> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNote(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNote(PathMetadata metadata, PathInits inits) {
        this(Note.class, metadata, inits);
    }

    public QNote(Class<? extends Note> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.author = inits.isInitialized("author") ? new com.ziglog.ziglog.domain.member.entity.QMember(forProperty("author")) : null;
        this.folder = inits.isInitialized("folder") ? new QFolder(forProperty("folder"), inits.get("folder")) : null;
    }

}

