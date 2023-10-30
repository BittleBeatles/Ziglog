import SingleQuotation from '@components/userPage/QuotationModal/SingleQuotation';
import { InputHTMLAttributes } from 'react';

interface QuotationModalProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
}

export default function QuotationModal({
  theme = 'light',
  ...rest
}: QuotationModalProps) {
  return (
    <div
      className={`${THEME_VARIANTS[theme]} w-80 h-fit rounded-md border p-2`}
    >
      <SingleQuotation
        theme={theme}
        isBookMarked={true}
        title="메롱입니다"
        nickname="frog_slayer"
      />
      <SingleQuotation
        theme={theme}
        isBookMarked={true}
        title="안녕하세요"
        nickname="hanulkim"
      />
      <SingleQuotation
        theme={theme}
        isBookMarked={false}
        title="Javascript"
        nickname="yonseong2"
      />
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout',
  dark: 'bg-dark-background-page text-white',
};
