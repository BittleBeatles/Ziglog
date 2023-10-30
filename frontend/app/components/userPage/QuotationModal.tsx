import SingleQuotation from '@components/userPage/QuotationModal/SingleQuotation';
import { InputHTMLAttributes } from 'react';

interface QuotationModalProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
}

export default function QuotationModal({
  theme = 'light',
  ...rest
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
    {
      noteId: 3,
      title: 'Javascript',
      nickname: 'yonseong2',
      isBookmarked: false,
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
            isBookMarked={bookmark.isBookmarked}
            title={bookmark.title}
            nickname={bookmark.nickname}
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
