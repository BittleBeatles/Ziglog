import { ButtonHTMLAttributes } from 'react';
import SvgIcon from '../common/SvgIcon';
import Text from '../common/Text';

interface BookmarkQuoteInfoProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'light' | 'dark';
  bookmarkCount: number;
  quotedCount: number;
  isBookmarked: boolean;
}

export default function BookmarkQuoteInfo({
  theme,
  bookmarkCount,
  quotedCount,
  isBookmarked,
  ...rest
}: BookmarkQuoteInfoProps) {
  return (
    <div
      className={`${THEME_VARIANTS[theme]} w-16 h-44 rounded-full py-6 grid place-items-center`}
    >
      <SvgIcon
        name={isBookmarked ? 'BookMarkFill' : 'BookMark'}
        color={theme == 'light' ? 'black' : 'white'}
        size={28}
      />

      <Text className="mb-4" type="p">
        {bookmarkCount > 999 ? '1000+' : bookmarkCount}
      </Text>
      <SvgIcon name="Share" color={theme == 'light' ? 'black' : 'white'} />
      <Text type="p">{quotedCount > 999 ? '1000+' : quotedCount}</Text>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout',
  dark: 'bg-dark-background-layout text-white',
};
