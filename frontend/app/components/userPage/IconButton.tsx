import { ButtonHTMLAttributes } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import * as Icons from '../../src/design/iconIndex';
import colors from '@src/design/color';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: keyof typeof Icons;
  theme: 'dark' | 'light';
}
export default function IconButton({ name, theme, ...rest }: IconButtonProps) {
  return (
    <button {...rest}>
      <SvgIcon
        name={name}
        color={theme === 'dark' ? colors.white : colors.black}
      />
    </button>
  );
}
