import SideDataContext from '@(pages)/user-page/[userNickname]/SideDataContext';
import IconButton from '@components/common/IconButton';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';
import colors from '@src/design/color';
import { findFolderIdByNoteId } from '@src/util/findParentId';
import { useAppSelector } from '@store/store';

import { useParams, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

export interface NoteProps {
  type?: 'note';
  id: number;
  title: string;
  isPublic: boolean;
  depth?: number;
  theme?: 'light' | 'dark';
  currentNoteId?: number;
  isModifyDelete?: boolean;
  parentId?: number;
  setParentId?: Dispatch<SetStateAction<number>>;
  onNoteEdit: (editingNoteId: number, title: string) => void;
}

export default function Note({
  title,
  id,
  depth = 0,
  theme = 'light',
  currentNoteId,
  isPublic,
  setParentId,
  isModifyDelete,
  onNoteEdit,
}: NoteProps) {
  const param = useParams();
  const paramsNickname = decodeURIComponent(param.userNickname as string);
  const { nickname } = useAppSelector((state) => state.user);
  const [isMine] = useState(nickname === paramsNickname);
  const router = useRouter();
  const { sideData } = useContext(SideDataContext);
  const noteNavigate = () => {
    if (setParentId) {
      const findId = findFolderIdByNoteId(sideData, id);
      setParentId(findId);
    }
    router.push(`/user-page/${paramsNickname}/read-note/${id}`);
  };

  // 노트 아이디 상위로 전달
  const handleEdit = (editingNoteId: number, title: string) => {
    if (onNoteEdit) {
      onNoteEdit(editingNoteId, title);
    }
  };

  return (
    <div className="flex items-center">
      <div
        onClick={noteNavigate}
        className={`${
          depth !== 0 ? 'pl-5' : ''
        } cursor-pointer flex items-center mt-2 mb-2 hover:opacity-60 transition-opacity duration-300  ${
          id === currentNoteId ? 'text-main-75' : ''
        }`}
      >
        <SvgIcon
          name="NoteDescription"
          color={theme === 'light' ? colors.black : colors.white}
        />
        <Text className={`pl-1 truncate ${THEME_VARINTS[theme]}`}>{title}</Text>
        {!isPublic && !isMine && (
          <SvgIcon
            size={18}
            name="Private"
            color={theme === 'light' ? colors.black : colors.white}
          />
        )}
      </div>
      {isModifyDelete && (
        <div className="flex items-center ml-2">
          <IconButton
            size={18}
            theme={theme}
            name="Edit"
            onClick={() => handleEdit(id, title)}
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
