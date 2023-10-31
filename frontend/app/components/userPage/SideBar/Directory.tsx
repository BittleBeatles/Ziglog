'use client';
import React, { Dispatch, SetStateAction } from 'react';
import Folder, { FolderProps } from './Directory/Folder';
import CreateFile from './Directory/CreateFile';
import Note, { NoteProps } from './Directory/Note';
import { createNote } from '@api/note/note';

export interface DirectoryProps {
  directoryList: DirectoryItem[];
  theme?: 'light' | 'dark';
  parentId?: number;
  setParentId?: Dispatch<SetStateAction<number>>;
  showFolderInput?: boolean;
  setShowFolderInput?: Dispatch<SetStateAction<boolean>>;
  setFolderName?: Dispatch<SetStateAction<string>>;
  showNoteInput?: boolean;
  setShowNoteInput?: Dispatch<SetStateAction<boolean>>;
  setNoteName?: Dispatch<SetStateAction<string>>;
  folderName?: string;
  noteName?: string;
}
export type DirectoryItem = (NoteProps | FolderProps) & {
  type: 'note' | 'folder';
};

export default function Directory({
  directoryList,
  theme = 'light',
  parentId,
  setParentId,
  showFolderInput,
  setShowFolderInput,
  setFolderName,
  showNoteInput,
  setShowNoteInput,
  setNoteName,
  folderName,
  noteName,
}: DirectoryProps) {
  const handleKeyDown = (
    type: 'folder' | 'note',
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      if (type === 'folder') {
        console.log(parentId, folderName);
        if (parentId && folderName) {
          createNote(parentId, folderName);
        }
      } else {
        console.log(parentId, noteName);
        if (parentId && noteName) {
          createNote(parentId, noteName);
        }
      }
      e.preventDefault();
    }
  };

  return (
    <div className="w-full">
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
            folderId={item.folderId}
            theme={theme}
            title={item.title}
            notes={item.notes}
            depth={0}
            directoryList={directoryList}
            parentId={parentId}
            setParentId={setParentId}
            showFolderInput={parentId ? showFolderInput : false}
            setShowFolderInput={setShowFolderInput}
            setFolderName={setFolderName}
            showNoteInput={showNoteInput}
            setShowNoteInput={setShowNoteInput}
            setNoteName={setNoteName}
            folderName={folderName}
            noteName={noteName}
          />
        )
      )}
      {parentId === -1 && showFolderInput && (
        <CreateFile
          onChange={(e) => setFolderName && setFolderName(e.target.value)}
          placeholder="폴더 생성"
          onKeyDown={(e) => handleKeyDown('folder', e)}
        />
      )}
      {parentId === -1 && showNoteInput && (
        <CreateFile
          type="note"
          onChange={(e) => setNoteName && setNoteName(e.target.value)}
          placeholder="노트 생성"
          onKeyDown={(e) => handleKeyDown('note', e)}
        />
      )}
    </div>
  );
}
