import { InputHTMLAttributes, useState } from 'react';
import SvgIcon from '../common/SvgIcon';
import Text from '../common/Text';
import { addBookmark, deleteBookmark } from '@api/bookmark/bookmark';

interface BookmarkQuoteInfoProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
  bookmarked: number;
  quoted: number;
}

export default function BookmarkQuoteInfo({
  theme = 'light',
  bookmarked = 50,
  quoted = 50,
  ...rest
}: BookmarkQuoteInfoProps) {
  const num = bookmarked;
  const [isBookMarked, setBookmark] = useState(false);
  const [bookmarkNo, doBookmark] = useState(num);
  function changeBookmark(isBookMarked: boolean) {
    setBookmark(isBookMarked);
  }
  const addBookmarkCount = () => {
    doBookmark(bookmarkNo + 1);
  };
  const deleteBookmarkCount = () => {
    doBookmark(bookmarkNo - 1);
  };

  const noteId = 1;
  return (
    <div
      className={`${THEME_VARIANTS[theme]} w-16 h-44 rounded-full py-6 grid place-items-center`}
    >
      {isBookMarked ? (
        <SvgIcon
          onClick={() => {
            deleteBookmark(noteId);
            changeBookmark(!isBookMarked);
            deleteBookmarkCount();
            console.log(num);
          }}
          name={'BookMarkFill'}
          color={theme == 'light' ? 'black' : 'white'}
          size={28}
        />
      ) : (
        <SvgIcon
          onClick={() => {
            addBookmark(noteId);
            changeBookmark(!isBookMarked);
            addBookmarkCount();
            console.log(num);
          }}
          name={'BookMark'}
          color={theme == 'light' ? 'black' : 'white'}
          size={28}
        />
      )}

      <Text className="mb-4" type="p">
        {bookmarkNo > 999 ? '1000+' : bookmarkNo}
      </Text>
      <SvgIcon name="Share" color={theme == 'light' ? 'black' : 'white'} />
      <Text type="p">{quoted > 999 ? '1000+' : quoted}</Text>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout',
  dark: 'bg-dark-background-layout text-white',
};
