import { InputHTMLAttributes } from 'react';
import SvgIcon from './SvgIcon';
import Text from './Text';

interface BookmarkQuoteInfoProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
  bookmarked: number;
  quoted: number;
}

export default function ArticleUserInfo({
  theme = 'light',
  bookmarked = 50,
  quoted = 50,
  ...rest
}: BookmarkQuoteInfoProps) {
  const isBookMarked = false;
  return (
    <div
      className={`${THEME_VARIANTS[theme]} w-16 h-44 rounded-full py-6 grid place-items-center`}
    >
      <SvgIcon
        name={isBookMarked ? 'BookMarkFill' : 'BookMark'}
        color={theme == 'light' ? 'black' : 'white'}
        size={28}
      />
      <Text className="mb-4" type="p">
        {bookmarked > 999 ? '1000+' : bookmarked}
      </Text>
      <SvgIcon name="Share" color={theme == 'light' ? 'black' : 'white'} />
      <Text type="p">{quoted > 999 ? '1000+' : quoted}</Text>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout',
  dark: 'bg-dark-background-page text-white',
};
