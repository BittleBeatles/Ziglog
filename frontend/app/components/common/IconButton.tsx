import { ButtonHTMLAttributes } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import * as Icons from '../../src/design/iconIndex';
import colors from '@src/design/color';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: keyof typeof Icons;
  theme: 'dark' | 'light';
  size: number;
}
export default function IconButton({
  name,
  theme,
  size,
  ...rest
}: IconButtonProps) {
  return (
    <button {...rest}>
      <SvgIcon
        name={name}
        color={theme === 'dark' ? colors.white : colors.black}
        size={size}
      />
    </button>
  );
}
