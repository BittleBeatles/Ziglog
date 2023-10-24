import { ButtonHTMLAttributes } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import * as Icons from '../../src/design/iconIndex';
import colors from '@src/design/color';

interface IconButtonWithBgProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: keyof typeof Icons;
  theme: 'dark' | 'light';
}

const THEME_VARIANTS = {
  light: 'bg-white',
  dark: 'bg-dark-background-page',
};

export default function IconButtonWithBg({
  name,
  theme,
  ...rest
}: IconButtonWithBgProps) {
  return (
    <button
      className={`${THEME_VARIANTS[theme]} w-fit h-fit p-1 rounded-lg border border-border-grey`}
      {...rest}
    >
      <SvgIcon
        name={name}
        color={theme === 'dark' ? colors.white : colors.black}
      />
    </button>
  );
}
