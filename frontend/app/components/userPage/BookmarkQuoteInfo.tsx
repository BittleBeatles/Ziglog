import { ButtonHTMLAttributes } from 'react';
import SvgIcon from '../common/SvgIcon';
import Text from '../common/Text';
import { showAlert } from '@src/util/alert';
import IconButton from '@components/common/IconButton';
interface BookmarkQuoteInfoProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'light' | 'dark';
  bookmarkCount: number;
  quotedCount: number;
  isBookmarked: boolean;
  handleBookmarkChange: () => void;
  isLogin: boolean;
}

export default function BookmarkQuoteInfo({
  theme,
  bookmarkCount,
  quotedCount,
  isBookmarked,
  handleBookmarkChange,
  isLogin,
}: BookmarkQuoteInfoProps) {
  const handleClick = () => {
    if (isLogin) {
      handleBookmarkChange();
    } else {
      showAlert('로그인 후 이용해주세요.', 'warning');
    }
  };
  return (
    <div
      className={`${THEME_VARIANTS[theme]} w-16 h-44 rounded-full py-6 grid place-items-center`}
    >
      <IconButton
        onClick={handleClick}
        name={isBookmarked ? 'BookMarkFill' : 'BookMark'}
        theme={theme}
        size={28}
      />

      <Text className="mb-4" type="p">
        {bookmarkCount > 999 ? '1000+' : bookmarkCount}
      </Text>
      <SvgIcon
        name="Quote"
        color={theme == 'light' ? 'black' : 'white'}
        size={20}
      />
      <Text type="p">{quotedCount > 999 ? '1000+' : quotedCount}</Text>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout',
  dark: 'bg-dark-background-layout text-white',
};
