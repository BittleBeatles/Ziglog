package com.ziglog.ziglog.domain.note.dto.response.note;

import com.ziglog.ziglog.domain.note.entity.Note;
import lombok.Getter;

import java.util.List;


@Getter
public class QuotingIdListResponseDto {
    List<Long> quotingNoteIds;

    private QuotingIdListResponseDto(List<Long> quotingNoteIds){
        this.quotingNoteIds = quotingNoteIds;
    }

    public static QuotingIdListResponseDto toDto(List<Note> notes){
        return new QuotingIdListResponseDto(notes.stream().map(Note::getId).toList());
    }
}
