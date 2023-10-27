'use client';
import IconButton from '@components/common/IconButton';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';
import colors from '@src/design/color';
import Link from 'next/link';
import { useState } from 'react';

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
  const [showAll, setShowAll] = useState(false);
  const displayedNotes = showAll ? noteList : noteList.slice(0, 5);

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex items-center ">
          <SvgIcon
            name="BookMarks"
            color={theme === 'light' ? colors.black : colors.white}
          />
          <Text type="b" className="pl-1 truncate">
            북마크
          </Text>
        </div>
        {noteList.length > 5 && !showAll && (
          <IconButton
            theme={theme}
            onClick={() => setShowAll(true)}
            name="ExpandMore"
          />
        )}
        {showAll && (
          <IconButton
            theme={theme}
            onClick={() => setShowAll(false)}
            name="ExpandLess"
          />
        )}
      </div>
      <div className="mt-5">
        {displayedNotes.map((note) => {
          return (
            <Link
              href={`/user-page/${note.userNickname}/read-note/${note.noteId}`}
              key={note.noteId}
            >
              <div className="flex items-center mb-3 opacity-100 hover:opacity-60 transition-opacity duration-300">
                <SvgIcon
                  name="Note"
                  color={theme === 'light' ? colors.black : colors.white}
                />
                <Text className={`pl-1 truncate ${THEME_VARINTS[theme]}`}>
                  {note.title}
                </Text>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const THEME_VARINTS = {
  light: 'text-black',
  dark: 'text-white',
};
