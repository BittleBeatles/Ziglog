package com.ziglog.ziglog.domain.note.repository;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Note;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuotationRepository extends JpaRepository<Quotation, Long> {
   void deleteQuotationsByIdIn(List<Long> quotationId);

   Optional<Quotation> findByStartNoteAndEndNoteAndOwner(Note startNote, Note endNote, Member Owner);
}
