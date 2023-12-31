import { FolderProps } from '@components/userPage/SideBar/Directory/Folder';
import { NoteProps } from '@components/userPage/SideBar/Directory/Note';

export interface FolderListResponse {
  folderList: DirectoryItem[];
}

export type DirectoryItem = (NoteProps | FolderProps) & {
  type: 'note' | 'folder';
};

export interface JustFolderResponse {
  folderList: JustFolder[];
}

export interface JustFolder {
  id: number;
  title: string;
}
