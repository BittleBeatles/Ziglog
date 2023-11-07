import SvgIcon from '@components/common/SvgIcon';
import { HTMLAttributes } from 'react';

interface SingleQuotationProps extends HTMLAttributes<HTMLDivElement> {
  theme: 'light' | 'dark';
  isBookMarked?: boolean;
  title?: string;
  nickname: string;
  isPublic: boolean;
}

export default function SingleQuotation({
  isBookMarked = true,
  title = '제목없음',
  nickname,
  theme,
  isPublic,
  ...rest
}: SingleQuotationProps) {
  return (
    <div
      {...rest}
      className={`${THEME_VARIANTS[theme]} ${
        isPublic && HOVER_COLOR[theme]
      } h-12 rounded-md flex flex-row `}
    >
      <div className="w-8 h-12 grid place-content-center">
        {isPublic ? (
          <SvgIcon name="BookMarkFill" color="blue" />
        ) : (
          <SvgIcon name="Private" color="black" />
        )}
      </div>
      <div className="grid place-content-center">
        <p className="leading-4">{title}</p>
        <p className="text-xs leading-4 font-normal">{nickname}</p>
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout',
  dark: 'bg-dark-background-page text-white ',
};

const HOVER_COLOR = {
  light: 'hover:bg-input-grey',
  dark: 'hover:bg-dark-background-layout',
};
