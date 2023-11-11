import Text from '@components/common/Text';
import Note, { NoteProps } from './Note';
import SvgIcon from '@components/common/SvgIcon';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import colors from '@src/design/color';
import { findParentId } from '@src/util/findParentId';
import CreateFile from './CreateFile';
import { DirectoryItem } from '@api/folder/types';
import { createFolder, deleteFolder } from '@api/folder/folder';
import IconButton from '@components/common/IconButton';
import SideDataContext from '@(pages)/user-page/[userNickname]/SideDataContext';

export interface FolderProps {
  type?: 'folder';
  id: number;
  title: string;
  isPublic: boolean;
  notes?: DirectoryItem[];
  depth?: number;
  theme?: 'light' | 'dark';
  parentId?: number;
  onEdit?: (id: number, title: string) => void;
  setParentId?: Dispatch<SetStateAction<number>>;
  showInput?: { show: boolean; type: 'note' | 'folder' };
  setShowInput?: Dispatch<
    SetStateAction<{ show: boolean; type: 'note' | 'folder' }>
  >;
  currentNoteId?: number;
  folderName?: string;
  setFolderName?: Dispatch<SetStateAction<string>>;
  isModifyDelete?: boolean;
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
  isModifyDelete,
  onEdit,
}: FolderProps) {
  const paddingLeft = `${depth * 1.25}rem`;
  const [isFolderOpen, setFolderOpen] = useState(
    notes?.some(
      (item) => item.type === 'note' && (item as NoteProps).id === currentNoteId
    )
  );
  const { getGraphData, getSideList, getNoteGraphData } =
    useContext(SideDataContext);

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
        await createFolder(parentId, folderName);
        getSideList();
        getGraphData();
        getNoteGraphData();
        setFolderName('');
        setShowInput({ show: false, type: 'folder' });
      } catch {
        console.log('폴더가 생성안됬어요');
      }
    }
  };

  // 폴더 삭제
  const handleDelete = async () => {
    if (getSideList) {
      try {
        await deleteFolder(id);
        getSideList();
        getGraphData();
        getNoteGraphData();
      } catch {
        console.log('폴더가 삭제가 안됐음');
      }
    }
  };

  // 폴더아이디 상위로 전달
  const handleEdit = (folderId: number, folderTitle: string) => {
    if (onEdit) {
      onEdit(folderId, folderTitle);
    }
  };

  return (
    <div className="folder mb-2" style={{ paddingLeft }}>
      <div className="flex items-center">
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
          <Text className={`pl-1 truncate ${THEME_VARINTS[theme]}`}>
            {title}
          </Text>
        </div>

        {isModifyDelete && (
          <div className="flex items-center ml-2">
            <IconButton
              size={18}
              onClick={() => handleEdit(id, title)}
              theme={theme}
              name="Edit"
            />
            <IconButton
              size={18}
              onClick={handleDelete}
              theme={theme}
              name="Remove"
            />
          </div>
        )}
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
                  parentId={parentId}
                  setParentId={setParentId}
                  currentNoteId={currentNoteId}
                  isModifyDelete={isModifyDelete}
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
                  isModifyDelete={isModifyDelete}
                  onEdit={onEdit}
                />
              )
            )}
        </div>
      )}
      {parentId === id &&
        showInput &&
        showInput.show &&
        showInput.type === 'folder' && (
          <div style={{ paddingLeft: '1.25rem' }}>
            <CreateFile
              theme={theme}
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
