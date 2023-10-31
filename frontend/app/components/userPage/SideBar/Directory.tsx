'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Folder, { FolderProps } from './Directory/Folder';
import CreateFile from './Directory/CreateFile';
import Note, { NoteProps } from './Directory/Note';
import { createNote } from '@api/note/note';
import { createFolder } from '@api/folder/folder';
import { useParams } from 'next/navigation';

export interface DirectoryProps {
  directoryList: DirectoryItem[];
  theme?: 'light' | 'dark';
  parentId?: number;
  setParentId?: Dispatch<SetStateAction<number>>;
  showInput?: { show: boolean; type: 'note' | 'folder' };
  setShowInput?: Dispatch<
    SetStateAction<{ show: boolean; type: 'note' | 'folder' }>
  >;
  folderName?: string;
  setFolderName?: Dispatch<SetStateAction<string>>;
}
export type DirectoryItem = (NoteProps | FolderProps) & {
  type: 'note' | 'folder';
};

export default function Directory({
  directoryList,
  theme = 'light',
  parentId,
  setParentId,
  showInput,
  folderName,
  setFolderName,
  setShowInput,
}: DirectoryProps) {
  const params = useParams();
  const currentNoteId = Number(params.noteId);

  // 폴더 입력했을 때 렌더링하기 위함
  const [keyDownCounter, setKeyDownCounter] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && parentId && folderName) {
      // 3은 parentId가 될 예정
      console.log(parentId, folderName);
      createFolder(3, folderName);

      setKeyDownCounter(keyDownCounter + 1);

      e.preventDefault();
    }
  };

  return (
    <div className="w-full">
      {directoryList.map((item) =>
        item.type === 'note' ? (
          <Note
            theme={theme}
            key={item.noteId}
            nickname={item.nickname}
            noteId={item.noteId}
            title={item.title}
          />
        ) : (
          <Folder
            theme={theme}
            key={item.folderId}
            folderId={item.folderId}
            title={item.title}
            depth={0}
            notes={item.notes}
            parentId={parentId}
            setParentId={setParentId}
            showInput={showInput}
            setShowInput={setShowInput}
            currentNoteId={currentNoteId}
            folderName={folderName}
            setFolderName={setFolderName}
            handleKeyDown={handleKeyDown}
          />
        )
      )}
      {parentId === -1 &&
        showInput &&
        showInput.show &&
        showInput.type === 'note' && <CreateFile type="note" />}
      {parentId === -1 &&
        showInput &&
        showInput.show &&
        showInput.type === 'folder' && (
          <CreateFile
            onChange={(e) => setFolderName && setFolderName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="folder"
          />
        )}
    </div>
  );
}
