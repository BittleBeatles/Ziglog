'use client';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';
import colors from '@src/design/color';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export interface NoteProps {
  type?: 'note';
  id: number;
  title: string;
  isPublic: boolean;
  depth?: number;
  theme?: 'light' | 'dark';
  currentNoteId?: number;
}

export default function Note({
  type,
  title,
  id,
  depth = 0,
  theme = 'light',
  currentNoteId,
}: NoteProps) {
  const param = useParams();
  const nickname = decodeURIComponent(param.userNickname as string);
  return (
    <div>
      <Link
        href={`/user-page/${nickname}/read-note/${id}`}
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
      </Link>
    </div>
  );
}

const THEME_VARINTS = {
  light: '',
  dark: 'text-white',
};
