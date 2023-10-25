package com.ziglog.ziglog.domain.note.repository;

import com.ziglog.ziglog.domain.note.entity.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuotationRepository extends JpaRepository<Quotation, Long> {

    void deleteQuotationById(Long id);
}
