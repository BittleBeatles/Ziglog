'use client';
import { Note } from '@api/bookmark/types';
import IconButton from '@components/common/IconButton';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';
import colors from '@src/design/color';
import { showAlert } from '@src/util/alert';
import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { deleteBookmark } from '@api/bookmark/bookmark';
import SideDataContext from '@(pages)/user-page/[userNickname]/SideDataContext';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@store/store';

export interface BookmarkListProps {
  noteList: Note[];
  theme?: 'light' | 'dark';
}

const THEME_VARIANTS = {
  light: '#F6F6F6',
  dark: '#3A3A3C',
};

export default function BookmarkList({
  noteList,
  theme = 'light',
}: BookmarkListProps) {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const displayedNotes = showAll ? noteList : noteList.slice(0, 5);
  const { getBookmarkList } = useContext(SideDataContext);
  const { nickname } = useAppSelector((state) => state.user);
  const params = useParams();
  const paramsNickname = decodeURIComponent(params.userNickname as string);
  const isMine = useState(nickname === paramsNickname);
  const handleUndoBookmark = (noteId: number, theme: 'light' | 'dark') => {
    const bg = THEME_VARIANTS[theme];
    const textColor = theme === 'light' ? 'black' : 'white';
    Swal.fire({
      html: '해당 노트에 대한 북마크를<br/>해제하시겠습니까?',
      showCloseButton: true,
      width: 300,
      background: bg,
      color: textColor,
      confirmButtonText: '해제하기',
      confirmButtonColor: '#3D4EFE',
    }).then(async (res) => {
      if (res.isConfirmed) {
        const res = deleteBookmark(noteId);
        if (await res) {
          showAlert('성공적으로 해제되었습니다', 'success');
          getBookmarkList();
        }
      }
    });
  };
  const handleTitleClick = (
    nickname: string,
    noteId: number,
    isPublic: boolean
  ) => {
    if (isPublic || isMine) {
      router.push(`/user-page/${nickname}/read-note/${noteId}`);
    } else {
      showAlert('비공개 글 입니다.', 'info');
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex items-center ">
          <SvgIcon
            name="BookMarks"
            color={theme === 'light' ? colors.black : colors.white}
          />
          <Text type="b" className={`pl-1 truncate ${THEME_VARINTS[theme]}`}>
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
            <div
              key={note.noteId}
              className="flex items-center mb-3 opacity-100 "
            >
              <span className=" cursor-pointer hover:opacity-60 transition-opacity duration-300">
                <SvgIcon
                  onClick={() => handleUndoBookmark(note.noteId, theme)}
                  name="BookMarkFill"
                  color={theme === 'light' ? colors.black : colors.white}
                />
              </span>
              <span
                onClick={() =>
                  handleTitleClick(note.nickname, note.noteId, note.isPublic)
                }
                className={`px-1 truncate ${THEME_VARINTS[theme]} cursor-pointer hover:opacity-60 transition-opacity duration-300`}
              >
                {note.title}
              </span>
              {!note.isPublic && (
                <SvgIcon
                  name="Private"
                  color={theme === 'dark' ? 'white' : 'black'}
                  size={20}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const THEME_VARINTS = {
  light: '',
  dark: 'text-white',
};
