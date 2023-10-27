'use client';
import Text from '@components/common/Text';
import { DirectoryItem } from '../Directory';
import Note from './Note';
import SvgIcon from '@components/common/SvgIcon';
import { useState } from 'react';
import colors from '@src/design/color';
import CreateFile from './CreateFile';
import { findParentId } from './findParentId';

export interface FolderProps {
  type?: 'folder';
  folderId: number;
  title: string;
  notes?: DirectoryItem[];
  directoryList?: DirectoryItem[];
  depth?: number;
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

export default function Folder({
  type,
  folderId,
  title,
  notes,
  depth = 0,
  theme = 'light',
  parentId,
  setParentId,
  showFolderInput,
  setShowFolderInput,
  setFolderName,
  directoryList,
  setNoteName,
  showNoteInput,
  setShowNoteInput,
}: FolderProps) {
  const paddingLeft = `${depth * 1.25}rem`;
  const [isFolderOpen, setFolderOpen] = useState(false);

  const handleFolder = () => {
    if (!isFolderOpen) {
      // 폴더를 열 때
      setFolderOpen(true);
      if (setParentId) {
        setParentId(folderId);
      }
    } else {
      // 폴더를 닫을 때
      setFolderOpen(false);
      if (setParentId && directoryList) {
        const parentFolderId = findParentId(
          directoryList,
          folderId,
          'folderId'
        );
        setParentId(parentFolderId);
      }
      if (setShowFolderInput) {
        setShowFolderInput(false);
      }

      if (setShowNoteInput) {
        setShowNoteInput(false);
      }
    }
  };

  return (
    <div className="folder mb-3" style={{ paddingLeft }}>
      <div
        onClick={handleFolder}
        className="flex items-center cursor-pointer hover:opacity-60 transition-opacity duration-300"
      >
        {isFolderOpen ? (
          <SvgIcon
            name="FolderOpen"
            color={theme === 'light' ? colors.black : colors.white}
          />
        ) : (
          <SvgIcon
            name="Folder"
            color={theme === 'light' ? colors.black : colors.white}
          />
        )}
        <Text className={`pl-1 truncate ${THEME_VARINTS[theme]}`}>{title}</Text>
      </div>
      {isFolderOpen && (
        <div className={`${BORDER_VARINTS[theme]}`}>
          {notes &&
            notes.map((item, index) =>
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
                  theme={theme}
                  folderId={item.folderId}
                  key={item.folderId}
                  title={item.title}
                  directoryList={directoryList}
                  notes={item.notes}
                  depth={depth + 1}
                  parentId={parentId}
                  setParentId={setParentId}
                  showFolderInput={
                    parentId && isFolderOpen ? showFolderInput : false
                  }
                  setShowFolderInput={setShowFolderInput}
                  setFolderName={setFolderName}
                  showNoteInput={showNoteInput}
                  setShowNoteInput={setShowNoteInput}
                  setNoteName={setNoteName}
                />
              )
            )}
        </div>
      )}
      {showFolderInput && parentId === folderId && (
        <div style={{ paddingLeft: '1.25rem' }}>
          <CreateFile
            onChange={(e) => setFolderName && setFolderName(e.target.value)}
            placeholder="폴더 생성"
          />
        </div>
      )}
      {showNoteInput && parentId === folderId && (
        <div style={{ paddingLeft: '1.25rem' }}>
          <CreateFile
            type="note"
            onChange={(e) => setNoteName && setNoteName(e.target.value)}
            placeholder="노트 생성"
          />
        </div>
      )}
    </div>
  );
}

const THEME_VARINTS = {
  light: '',
  dark: 'text-white',
};

const BORDER_VARINTS = {
  light: 'border-l-2',
  dark: 'border-l-2 border-grey',
};
