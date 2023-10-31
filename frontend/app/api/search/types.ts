export interface SearchInfo {
  data: {
    notes: SearchResult[];
  };
}

export interface SearchResult {
  noteId: number;
  title: string;
  preview: string;
  nickname: string;
  isPublic: boolean;
  bookmarkCount: number;
  postTime: Date;
  editTime: Date | null;
}
