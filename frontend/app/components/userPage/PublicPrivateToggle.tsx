import { ButtonHTMLAttributes } from 'react';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';
import colors from '@src/design/color';

interface PublicPrivateToggleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  scope: 'Public' | 'Private';
  theme: 'dark' | 'light';
}

export default function PublicPrivateToggle({
  scope,
  theme,
  ...rest
}: PublicPrivateToggleProps) {
  return (
    <button
      {...rest}
      className={`${THEME_VARIANTS[theme]} flex gap-2 rounded-lg w-fit p-2 font-bold opacity-100 hover:opacity-60 transition-opacity duration-300 items-center`}
    >
      <SvgIcon
        name={scope}
        color={theme === 'dark' ? colors.white : colors.black}
      />
      <Text type="span">{scope === 'Public' ? '전체공개' : '비공개'}</Text>
    </button>
  );
}

const THEME_VARIANTS = {
  dark: 'bg-dark-background-layout text-white',
  light: 'bg-light-background-layout border-border-grey ',
};
