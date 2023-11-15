package com.ziglog.ziglog.domain.note.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuotation is a Querydsl query type for Quotation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuotation extends EntityPathBase<Quotation> {

    private static final long serialVersionUID = -482886080L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQuotation quotation = new QQuotation("quotation");

    public final QNote endNote;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ziglog.ziglog.domain.member.entity.QMember owner;

    public final QNote startNote;

    public QQuotation(String variable) {
        this(Quotation.class, forVariable(variable), INITS);
    }

    public QQuotation(Path<? extends Quotation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQuotation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQuotation(PathMetadata metadata, PathInits inits) {
        this(Quotation.class, metadata, inits);
    }

    public QQuotation(Class<? extends Quotation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.endNote = inits.isInitialized("endNote") ? new QNote(forProperty("endNote"), inits.get("endNote")) : null;
        this.owner = inits.isInitialized("owner") ? new com.ziglog.ziglog.domain.member.entity.QMember(forProperty("owner")) : null;
        this.startNote = inits.isInitialized("startNote") ? new QNote(forProperty("startNote"), inits.get("startNote")) : null;
    }

}

