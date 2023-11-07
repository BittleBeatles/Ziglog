export interface SearchInfo {
  notes: SearchResult[];
}

export interface SearchResult {
  noteId: number;
  title: string;
  preview: string | null;
  nickname: string;
  profileUrl: string;
  isPublic: boolean;
  bookmarkCount: number;
  postTime: Date;
  editTime: Date | null;
}
