export interface NoteInfo {
  noteId: number;
  title: string;
  content: string;
  nickname: string;
  isPublic: boolean;
  bookmarkCount: number;
  postTime: Date;
  editTime: Date;
}
