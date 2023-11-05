import { ButtonHTMLAttributes } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import * as Icons from '../../src/design/iconIndex';
import colors from '@src/design/color';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: keyof typeof Icons;
  theme: 'dark' | 'light';
  size?: number;
}
export default function IconButton({
  name,
  theme,
  size = 24,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className="opacity-100 hover:opacity-60 transition-opacity duration-300"
      {...rest}
    >
      <SvgIcon
        name={name}
        color={theme === 'dark' ? colors.white : colors.black}
        size={size}
      />
    </button>
  );
}
