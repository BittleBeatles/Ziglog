export interface Note {
  noteId: number;
  title: string;
  nickname: string;
  isPublic: boolean;
}

export interface IsBookmarked {
  bookmarked: boolean;
}
