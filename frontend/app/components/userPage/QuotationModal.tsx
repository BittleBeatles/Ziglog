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
}

export default function QuotationModal({
  theme,
  setQuotingNoteInfo,
  bookmarks,
}: QuotationModalProps) {
  return (
    <div>
      <div
        className={`${THEME_VARIANTS[theme]} w-80 h-fit rounded-md border p-2`}
      >
        {bookmarks?.map((bookmark, index) => (
          <SingleQuotation
            key={index}
            theme={theme}
            title={bookmark.title}
            nickname={bookmark.nickname}
            isPublic={bookmark.isPublic}
            onClick={() => {
              bookmark.isPublic
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
