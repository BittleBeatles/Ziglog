import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Folder from './Directory/Folder';
import CreateFile from './Directory/CreateFile';
import Note from './Directory/Note';
import { createFolder, editFolder } from '@api/folder/folder';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@store/store';
import IconButton from '@components/common/IconButton';
import Text from '@components/common/Text';
import EditInput from '@components/common/EditInput';
import SideDataContext from '@(pages)/user-page/[userNickname]/SideDataContext';
import { showAlert } from '@src/util/alert';

export interface DirectoryProps {
  theme?: 'light' | 'dark';
  parentId?: number;
  setParentId?: Dispatch<SetStateAction<number>>;
  showInput?: { show: boolean; type: 'note' | 'folder' };
  setShowInput?: Dispatch<
    SetStateAction<{ show: boolean; type: 'note' | 'folder' }>
  >;
  folderName?: string;
  setFolderName?: Dispatch<SetStateAction<string>>;
  isMine?: boolean;
}

export default function Directory({
  theme = 'light',
  parentId,
  setParentId,
  showInput,
  folderName,
  setFolderName,
  setShowInput,
  isMine,
}: DirectoryProps) {
  const params = useParams();
  const currentNoteId = Number(params.noteId);
  const rootId = useAppSelector((state) => state.user.rootFolderId);
  const [isModifyDelete, setModifyDelete] = useState(false);
  const [showFolderEdit, setFolderEdit] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolderId, setEditingFolderId] = useState(-1);
  const [editingTitle, setEditingTitle] = useState('');
  const { getGraphData, sideData, getSideList, getNoteGraphData } =
    useContext(SideDataContext);

  // 폴더 입력했을 때 렌더링하기 위함
  const [keyDownCounter, setKeyDownCounter] = useState(0);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
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
        getGraphData();
        getNoteGraphData();
        setKeyDownCounter(keyDownCounter + 1);
        setFolderName('');
        setShowInput({ show: false, type: 'folder' });
      } catch {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
      }
    }
  };

  const onEdit = (folderId: number, title: string) => {
    setEditingFolderId(folderId);
    setFolderEdit(!showFolderEdit);
    setEditingTitle(title);
  };

  useEffect(() => {
    if (!showFolderEdit) {
      setEditingFolderId(-1);
    }
  }, [showFolderEdit]);

  const handleEditKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editingFolderId !== -1 && newFolderName !== '') {
      e.preventDefault();
      try {
        await editFolder(editingFolderId, newFolderName);
        getSideList();
        getGraphData();
        getNoteGraphData();
        setNewFolderName('');
        setFolderEdit(false);
      } catch {
        showAlert('수정에 실패했습니다', 'error');
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <Text type="b">
          {isMine && isMine ? '내 워크스페이스' : '워크스페이스'}
        </Text>
        {isMine && (
          <IconButton
            onClick={() => setModifyDelete(!isModifyDelete)}
            theme={theme}
            name="More"
          />
        )}
      </div>
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
              parentId={parentId}
              setParentId={setParentId}
              currentNoteId={currentNoteId}
              isModifyDelete={isModifyDelete}
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
              isModifyDelete={isModifyDelete}
              onEdit={onEdit}
            />
          )
        )}
      {parentId === rootId &&
        showInput &&
        showInput.show &&
        showInput.type === 'folder' && (
          <CreateFile
            theme={theme}
            onChange={(e) => setFolderName && setFolderName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            type="folder"
          />
        )}
      {showFolderEdit && (
        <EditInput
          type="text"
          theme={theme}
          placeholder="폴더명 수정"
          defaultValue={`${editingTitle}`}
          setFolderEdit={setFolderEdit}
          onChange={(e) => setNewFolderName(e.target.value)}
          onKeyDown={handleEditKeyDown}
        />
      )}
    </div>
  );
}
