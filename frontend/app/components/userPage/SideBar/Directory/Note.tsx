'use client';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';
import colors from '@src/design/color';
import Link from 'next/link';

export interface NoteProps {
  type?: 'note';
  noteId: number;
  title: string;
  nickname: string;
  theme?: 'light' | 'dark';
}

export default function Note({
  type,
  title,
  noteId,
  nickname,
  theme = 'light',
}: NoteProps) {
  return (
    <div>
      <Link
        href={`/user-page/${nickname}/read-note/${noteId}`}
        className="flex items-center pl-5 mt-2 mb-2 hover:opacity-60 transition-opacity duration-300"
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
