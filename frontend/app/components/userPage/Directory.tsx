'use client';
import Folder, { FolderProps } from './Directory/Folder';
import Note, { NoteProps } from './Directory/Note';

export interface DirectoryProps {
  directoryList: DirectoryItem[];
  theme?: 'light' | 'dark';
}
export type DirectoryItem = (NoteProps | FolderProps) & {
  type: 'note' | 'folder';
};

export default function Directory({
  directoryList,
  theme = 'light',
}: DirectoryProps) {
  return (
    <div className="max-h-48 overflow-y-auto scrollbar-hide">
      {directoryList.map((item) =>
        item.type === 'note' ? (
          <Note
            theme={theme}
            nickname={item.nickname}
            key={item.noteId}
            noteId={item.noteId}
            title={item.title}
          />
        ) : (
          <Folder
            key={item.folderId}
            theme={theme}
            title={item.title}
            notes={item.notes}
            depth={0}
          />
        )
      )}
    </div>
  );
}

const directoryList: DirectoryItem[] = [
  {
    type: 'folder',
    folderId: 1,
    title: 'React',
    notes: [
      {
        type: 'note',
        nickname: 'seongyong',
        noteId: 1,
        title: 'React 1강 기초',
      },
      {
        type: 'folder',
        folderId: 2,
        title: 'components',
        notes: [
          {
            type: 'note',
            nickname: 'seongyong',
            noteId: 2,
            title: 'React 2강 훅스',
          },
        ],
      },
    ],
  },
  {
    type: 'folder',
    folderId: 3,
    title: 'Vue',
    notes: [
      {
        type: 'note',
        nickname: 'seongyong',
        noteId: 3,
        title: 'Vue 1강 기초',
      },
    ],
  },
];
