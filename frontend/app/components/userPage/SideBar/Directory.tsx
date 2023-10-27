'use client';
import { useState } from 'react';
import Folder, { FolderProps } from './Directory/Folder';
import CreateFile from './Directory/CreateFile';
import Note, { NoteProps } from './Directory/Note';

export interface DirectoryProps {
  directoryList: DirectoryItem[];
  theme?: 'light' | 'dark';
  parentId?: number;
  setParentId?: React.Dispatch<React.SetStateAction<number>>;
  showFolderInput?: boolean;
  setShowFolderInput?: React.Dispatch<React.SetStateAction<boolean>>;
  setFolderName?: React.Dispatch<React.SetStateAction<string>>;
  showNoteInput?: boolean;
  setShowNoteInput?: React.Dispatch<React.SetStateAction<boolean>>;
  setNoteName?: React.Dispatch<React.SetStateAction<string>>;
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
}: DirectoryProps) {
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
          />
        )
      )}
      {parentId === -1 && showFolderInput && (
        <CreateFile
          onChange={(e) => setFolderName && setFolderName(e.target.value)}
          placeholder="폴더 생성"
        />
      )}
      {parentId === -1 && showNoteInput && (
        <CreateFile
          type="note"
          onChange={(e) => setFolderName && setFolderName(e.target.value)}
          placeholder="노트 생성"
        />
      )}
    </div>
  );
}
