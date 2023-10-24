'use client';
import Folder, { FolderProps } from './Directory/Folder';
import Note, { NoteProps } from './Directory/Note';

export interface DirectoryProps {
  directoryList: DirectoryItem[];
}
export type DirectoryItem = (NoteProps | FolderProps) & {
  type: 'note' | 'folder';
};

export default function Directory({ directoryList }: DirectoryProps) {
  return (
    <div>
      {directoryList.map((item) =>
        item.type === 'note' ? (
          <Note key={item.noteId} noteId={item.noteId} name={item.name} />
        ) : (
          <Folder
            key={item.folderId}
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
    folderId: 'f1',
    name: 'React',
    notes: [
      {
        type: 'note',
        noteId: 'n1',
        name: 'React 1강 기초',
      },
      {
        type: 'folder',
        folderId: 'f2',
        name: 'components',
        notes: [
          {
            type: 'note',
            noteId: 'n2',
            name: 'React 2강 훅스',
          },
        ],
      },
    ],
  },
  {
    type: 'folder',
    folderId: 'f3',
    name: 'Vue',
    notes: [
      {
        type: 'note',
        noteId: 'n3',
        name: 'Vue 1강 기초',
      },
    ],
  },
];
