import SvgIcon from '@components/common/SvgIcon';
import { ButtonHTMLAttributes } from 'react';

interface SingleQuotationProps extends ButtonHTMLAttributes<HTMLDivElement> {
  theme: 'light' | 'dark';
  isBookMarked?: boolean;
  title?: string;
  nickname?: string;
}

export default function SingleQuotation({
  isBookMarked = true,
  title = '안녕하세요',
  nickname = 'frog_slayer',
  theme,
  ...rest
}: SingleQuotationProps) {
  return (
    <div
      {...rest}
      className={`${THEME_VARIANTS[theme]} h-12 rounded-md flex flex-row hover:font-bold`}
    >
      <div className="w-8 h-12 grid place-content-center">
        {isBookMarked ? (
          <SvgIcon name="BookMarkFill" color="blue" />
        ) : (
          <div></div>
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
  light: 'bg-light-background-layout hover:bg-input-grey',
  dark: 'bg-dark-background-page text-white hover:bg-dark-background-layout',
};
