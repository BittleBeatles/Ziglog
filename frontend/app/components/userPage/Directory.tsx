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
            key={item.noteId}
            noteId={item.noteId}
            name={item.name}
          />
        ) : (
          <Folder
            key={item.folderId}
            theme={theme}
            name={item.name}
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
    name: 'React',
    notes: [
      {
        type: 'note',
        noteId: 1,
        name: 'React 1강 기초',
      },
      {
        type: 'folder',
        folderId: 2,
        name: 'components',
        notes: [
          {
            type: 'note',
            noteId: 2,
            name: 'React 2강 훅스',
          },
        ],
      },
    ],
  },
  {
    type: 'folder',
    folderId: 3,
    name: 'Vue',
    notes: [
      {
        type: 'note',
        noteId: 3,
        name: 'Vue 1강 기초',
      },
    ],
  },
];
