export interface quoteNote {
  noteId: number;
  title: string;
  isPublic: boolean;
  nickname: string;
}

// 글 읽기 페이지 : 내가 참조하는 & 나를 참조하는 목록
export interface quotingQuotedNotes {
  quotingNotes: quoteNote[];
  quotedNotes: quoteNote[];
}

// 글 수정 페이지 : 내가 참조하는 노트들 아이디 목록
export interface quotingNoteIdsList {
  quotingNoteIds: number[];
}
