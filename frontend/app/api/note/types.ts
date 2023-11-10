import Folder from '../../components/userPage/SideBar/Directory/Folder';

export interface NoteInfo {
  noteId: number;
  title: string;
  content: string;
  nickname: string;
  isPublic: boolean;
  bookmarkCount: number;
  postTime?: Date;
  editTime?: Date;
}

export interface EditNoteParams {
  title: string;
  content: string;
}

export interface NotePublicStatus {
  isPublic: boolean;
}

export interface NoteRefType {
  noteId: number;
  title: string;
  nickname: string;
  isPublic: boolean;
}

export interface NoteRefListInfo {
  quotationList: NoteRefType[];
}

export interface FolderNoteList {
  folder: Folder;
}

interface Folder {
  type: string;
  folderId: number;
  title: string;
  notes: Note[];
  folderList: string[];
}

interface Note {
  type: string;
  noteId: number;
  title: string;
  isPublic: boolean;
}
