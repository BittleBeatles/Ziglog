'use client';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';
import colors from '@src/design/color';
import Link from 'next/link';

interface Note {
  noteId: number;
  userNickname: string;
  title: string;
}

export interface BookmarkListProps {
  noteList: Note[];
  theme?: 'light' | 'dark';
}

export default function BookmarkList({
  noteList,
  theme = 'light',
}: BookmarkListProps) {
  return (
    <div className="w-fit">
      <div>
        <SvgIcon
          name="BookMarks"
          color={theme === 'light' ? colors.black : colors.white}
        />
      </div>
      <ul className="max-h-48 overflow-y-auto scrollbar-hide">
        {noteList.map((note) => {
          return (
            <Link
              href={`/user-page/${note.userNickname}/read-note/${note.noteId}`}
              key={note.noteId}
            >
              <li className="pl-6 w-full flex items-center mb-1 opacity-100 hover:opacity-60 transition-opacity duration-300">
                <SvgIcon
                  name="Note"
                  color={theme === 'light' ? colors.black : colors.white}
                />
                <Text
                  className={`pl-1 truncate w-full ${THEME_VARINTS[theme]}`}
                >
                  {note.title}
                </Text>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

const THEME_VARINTS = {
  light: 'text-black',
  dark: 'text-white',
};
