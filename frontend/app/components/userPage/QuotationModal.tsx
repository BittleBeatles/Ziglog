import SingleQuotation from '@components/userPage/QuotationModal/SingleQuotation';
import { ButtonHTMLAttributes } from 'react';
interface Bookmark {
  noteId: number;
  title: string;
  nickname: string;
}

interface QuotationModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'light' | 'dark';
  bookmarks?: Bookmark[];
  setQuotingNoteInfo: any;
}

export default function QuotationModal({
  theme = 'light',
  setQuotingNoteInfo,
}: QuotationModalProps) {
  const bookmarks = [
    {
      noteId: 1,
      title: '메롱입니다',
      nickname: 'frog_slayer',
      isBookmarked: true,
    },
    {
      noteId: 2,
      title: '안녕하세요',
      nickname: 'hanulkim',
      isBookmarked: true,
    },
  ];

  return (
    <div>
      <div
        className={`${THEME_VARIANTS[theme]} w-80 h-fit rounded-md border p-2`}
      >
        {bookmarks.map((bookmark, index) => (
          <SingleQuotation
            key={index}
            theme={theme}
            isBookMarked={true}
            title={bookmark.title}
            nickname={bookmark.nickname}
            onClick={() => {
              setQuotingNoteInfo({
                title: bookmark.title,
                nickname: bookmark.nickname,
                noteId: bookmark.noteId,
              });
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
