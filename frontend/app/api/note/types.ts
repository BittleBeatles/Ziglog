import { FolderProps } from '@components/userPage/SideBar/Directory/Folder';
import { NoteProps } from '@components/userPage/SideBar/Directory/Note';
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
  quotingNotes: number[];
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

interface quoteNote {
  noteId: number;
  title: string;
  isPublic: boolean;
  nickname: string;
}

export interface quotingQuotedNotes {
  quotingNotes: quoteNote[];
  quotedNotes: quoteNote[];
}
