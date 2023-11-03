import Text from '@components/common/Text';
import Note, { NoteProps } from './Note';
import SvgIcon from '@components/common/SvgIcon';
import { Dispatch, SetStateAction, useState } from 'react';
import colors from '@src/design/color';
import { findParentId } from './findParentId';
import CreateFile from './CreateFile';
import { DirectoryItem } from '@api/folder/types';
import { createFolder } from '@api/folder/folder';

export interface FolderProps {
  type?: 'folder';
  id: number;
  title: string;
  isPublic: boolean;
  notes?: DirectoryItem[];
  depth?: number;
  theme?: 'light' | 'dark';
  parentId?: number;
  setParentId?: Dispatch<SetStateAction<number>>;
  showInput?: { show: boolean; type: 'note' | 'folder' };
  setShowInput?: Dispatch<
    SetStateAction<{ show: boolean; type: 'note' | 'folder' }>
  >;
  currentNoteId?: number;
  folderName?: string;
  setFolderName?: Dispatch<SetStateAction<string>>;
  getSideList?: () => void;
}

export default function Folder({
  id,
  title,
  notes,
  depth = 0,
  theme = 'light',
  parentId,
  setParentId,
  showInput,
  setShowInput,
  currentNoteId,
  folderName,
  setFolderName,
  getSideList,
}: FolderProps) {
  const paddingLeft = `${depth * 1.25}rem`;
  const [isFolderOpen, setFolderOpen] = useState(
    notes?.some(
      (item) => item.type === 'note' && (item as NoteProps).id === currentNoteId
    )
  );

  const handleFolder = () => {
    if (!isFolderOpen) {
      // 폴더를 열 때
      setFolderOpen(true);
      if (setParentId) {
        setParentId(id);
      }
    } else {
      // 폴더를 닫을 때
      setFolderOpen(false);
      if (setParentId && notes) {
        const parentFolderId = findParentId(notes, id, 'folderId');
        setParentId(parentFolderId);
      }
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      parentId &&
      folderName &&
      setFolderName &&
      setShowInput &&
      getSideList
    ) {
      e.preventDefault();
      try {
        console.log(parentId, folderName);
        await createFolder(parentId, folderName);
        getSideList();
        setFolderName('');
        setShowInput({ show: false, type: 'folder' });
      } catch {
        console.log('폴더가 생성안됬어요');
      }
    }
  };

  return (
    <div className="folder mb-3" style={{ paddingLeft }}>
      <div
        onClick={handleFolder}
        className={`flex items-center cursor-pointer hover:opacity-60 transition-opacity duration-300`}
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
                  isPublic={item.isPublic}
                  key={item.type + item.id}
                  depth={depth + 1}
                  id={item.id}
                  title={item.title}
                  currentNoteId={currentNoteId}
                />
              ) : (
                <Folder
                  theme={theme}
                  isPublic={item.isPublic}
                  id={item.id}
                  key={item.type + item.id}
                  title={item.title}
                  notes={item.notes}
                  depth={depth + 1}
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
        </div>
      )}
      {parentId === id &&
        showInput &&
        showInput.show &&
        showInput.type === 'note' && (
          <div style={{ paddingLeft: '1.25rem' }}>
            <CreateFile type="note" />
          </div>
        )}
      {parentId === id &&
        showInput &&
        showInput.show &&
        showInput.type === 'folder' && (
          <div style={{ paddingLeft: '1.25rem' }}>
            <CreateFile
              onChange={(e) => setFolderName && setFolderName(e.target.value)}
              onKeyDown={(e) => handleKeyDown && handleKeyDown(e)}
              type="folder"
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
