import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Folder from './Directory/Folder';
import CreateFile from './Directory/CreateFile';
import Note from './Directory/Note';
import { createFolder } from '@api/folder/folder';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@store/store';
import { DirectoryItem } from '@api/folder/types';

export interface DirectoryProps {
  sideData: DirectoryItem[];
  theme?: 'light' | 'dark';
  parentId?: number;
  setParentId?: Dispatch<SetStateAction<number>>;
  showInput?: { show: boolean; type: 'note' | 'folder' };
  setShowInput?: Dispatch<
    SetStateAction<{ show: boolean; type: 'note' | 'folder' }>
  >;
  folderName?: string;
  setFolderName?: Dispatch<SetStateAction<string>>;
  getSideList: () => void;
}

export default function Directory({
  sideData,
  theme = 'light',
  parentId,
  setParentId,
  showInput,
  folderName,
  setFolderName,
  setShowInput,
  getSideList,
}: DirectoryProps) {
  const params = useParams();
  const currentNoteId = Number(params.noteId);
  const rootId = useAppSelector((state) => state.user.rootFolderId);

  // 폴더 입력했을 때 렌더링하기 위함
  const [keyDownCounter, setKeyDownCounter] = useState(0);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      parentId &&
      folderName &&
      setFolderName &&
      setShowInput
    ) {
      e.preventDefault();
      try {
        await createFolder(rootId, folderName);
        getSideList();
        setKeyDownCounter(keyDownCounter + 1);
        setFolderName('');
        setShowInput({ show: false, type: 'folder' });
      } catch {
        console.log('폴더가 생성안됬어요');
      }
    }
  };

  return (
    <div className="w-full">
      {sideData &&
        sideData.map((item) =>
          item.type === 'note' ? (
            <Note
              theme={theme}
              isPublic={item.isPublic}
              key={item.type + item.id}
              depth={0}
              id={item.id}
              title={item.title}
            />
          ) : (
            <Folder
              theme={theme}
              isPublic={item.isPublic}
              key={item.type + item.id}
              id={item.id}
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
              getSideList={getSideList}
            />
          )
        )}
      {parentId === rootId &&
        showInput &&
        showInput.show &&
        showInput.type === 'note' && <CreateFile type="note" />}
      {parentId === rootId &&
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
