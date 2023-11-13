import Text from '@components/common/Text';
import SvgIcon from '@components/common/SvgIcon';
import colors from '@src/design/color';
import { Note } from '@api/bookmark/types';
import { Dispatch, SetStateAction } from 'react';

// quotationList 가져옴
interface BookmarkCheckBoxProps {
  theme: 'dark' | 'light';
  bookmarkList: Note[];
  quotingNoteIds: number[];
  setQuotingNoteIds: Dispatch<SetStateAction<number[]>>;
  setIdChange: Dispatch<SetStateAction<boolean>>;
}

const TEXT_COLOR = {
  dark: 'text-white',
  light: 'text-black',
};

export default function BookmarkCheckBox({
  theme,
  bookmarkList,
  quotingNoteIds,
  setQuotingNoteIds,
  setIdChange,
}: BookmarkCheckBoxProps) {
  const handleChangeCheck = (noteId: number) => {
    if (quotingNoteIds.includes(noteId)) {
      setQuotingNoteIds(quotingNoteIds.filter((id) => id !== noteId));
    } else {
      setQuotingNoteIds([...quotingNoteIds, noteId]);
    }
    setIdChange(true);
  };
  return (
    <div
      className={`${THEME_VARIANTS[theme]} relative rounded-md p-5 flex flex-col gap-4 mt-3`}
    >
      {/* 북마크 아이콘  */}
      <div className="absolute -top-3 right-24">
        <SvgIcon name="BookMarkFill" color={colors['main-100']} size={70} />
      </div>
      {/* 제목 */}
      <Text type="h4">이 노트가 참조하고 있는 노트들을 선택해주세요.</Text>
      {/* 북마크 목록 - 스크롤로 */}
      <div
        id="sidebar-scroll"
        className="flex flex-col gap-2 h-36 overflow-y-auto"
      >
        {bookmarkList.length > 0 ? (
          bookmarkList.map((bookmark) => {
            let isFill = false;
            if (quotingNoteIds.includes(bookmark.noteId)) {
              isFill = true;
            }

            return (
              <div
                key={bookmark.noteId}
                className="flex flex-row gap-3 items-center"
              >
                <SvgIcon
                  onClick={() => handleChangeCheck(bookmark.noteId)}
                  name={isFill ? 'CheckBoxFill' : 'CheckBoxBlank'}
                  color={theme === 'dark' ? 'white' : 'black'}
                />
                <span>
                  {bookmark.nickname} : {bookmark.title}
                </span>
              </div>
            );
          })
        ) : (
          <span>북마크 목록이 없습니다.</span>
        )}
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout text-black',
  dark: 'bg-dark-background-layout text-white',
};
