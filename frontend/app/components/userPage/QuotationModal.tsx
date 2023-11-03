import SingleQuotation from '@components/userPage/QuotationModal/SingleQuotation';

interface QuotationModalProps {
  theme?: 'light' | 'dark';
  bookmarks?: [];
  handle: any;
}

export default function QuotationModal({
  theme = 'light',
  handle,
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
            isBookMarked={bookmark.isBookmarked}
            title={bookmark.title}
            nickname={bookmark.nickname}
            onClick={() => handle.execute(bookmark.nickname, bookmark.title)}
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
