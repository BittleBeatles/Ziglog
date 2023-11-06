'use client';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';
import colors from '@src/design/color';
import { useAppSelector } from '@store/store';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export interface NoteProps {
  type?: 'note';
  id: number;
  title: string;
  isPublic: boolean;
  depth?: number;
  theme?: 'light' | 'dark';
  currentNoteId?: number;
  isModifyDelete?: boolean;
}

export default function Note({
  title,
  id,
  depth = 0,
  theme = 'light',
  currentNoteId,
  isPublic,
}: NoteProps) {
  const param = useParams();
  const paramsNickname = decodeURIComponent(param.userNickname as string);
  const { nickname } = useAppSelector((state) => state.user);
  const [isMine] = useState(nickname === paramsNickname);

  return (
    <div className="flex items-center">
      <Link
        href={`/user-page/${paramsNickname}/read-note/${id}`}
        className={`${
          depth !== 0 ? 'pl-5' : ''
        }  flex items-center mt-2 mb-2 hover:opacity-60 transition-opacity duration-300  ${
          id === currentNoteId ? 'bg-gray-200' : ''
        }`}
      >
        <SvgIcon
          name="Note"
          color={theme === 'light' ? colors.black : colors.white}
        />
        <Text className={`pl-1 truncate ${THEME_VARINTS[theme]}`}>{title}</Text>
        {!isPublic && !isMine && (
          <SvgIcon
            name="Private"
            color={theme === 'light' ? colors.black : colors.white}
          />
        )}
      </Link>
    </div>
  );
}

const THEME_VARINTS = {
  light: '',
  dark: 'text-white',
};
