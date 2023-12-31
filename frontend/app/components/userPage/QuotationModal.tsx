import SingleQuotation from '@components/userPage/QuotationModal/SingleQuotation';
import { ButtonHTMLAttributes, Dispatch, SetStateAction } from 'react';
import { showAlert } from '@src/util/alert';
interface Bookmark {
  noteId: number;
  title: string;
  nickname: string;
  isPublic: boolean;
}

interface QuotationModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'light' | 'dark';
  bookmarks?: Bookmark[];
  setQuotingNoteInfo: Dispatch<
    SetStateAction<{
      nickname: string;
      title: string;
      noteId: number;
    }>
  >;
  userNickname: string;
}

export default function QuotationModal({
  theme,
  setQuotingNoteInfo,
  bookmarks,
  userNickname,
}: QuotationModalProps) {
  return (
    <div>
      <div
        id="sidebar-scroll"
        className={`${THEME_VARIANTS[theme]} w-80 max-h-60 overflow-auto rounded-md border p-2`}
      >
        {bookmarks?.map((bookmark, index) => (
          <SingleQuotation
            key={index}
            theme={theme}
            title={bookmark.title}
            nickname={bookmark.nickname}
            isPublic={bookmark.isPublic}
            isMine={userNickname === bookmark.nickname}
            onClick={() => {
              bookmark.isPublic || userNickname === bookmark.nickname
                ? setQuotingNoteInfo({
                    title: bookmark.title,
                    nickname: bookmark.nickname,
                    noteId: bookmark.noteId,
                  })
                : showAlert('비공개 글입니다', 'info');
            }}
          ></SingleQuotation>
        ))}
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout',
  dark: 'bg-dark-background-page text-white',
};
