import { HTMLAttributes } from 'react';
import IconButton from '@components/userPage/IconButton';
import Button from '@components/common/Button';
import Text from '@components/common/Text';

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
  login: boolean;
  theme?: 'light' | 'dark';
  type?: 'LightMode' | 'DarkMode';
}

export default function NavBar({
  login,
  theme = 'light',
  type = 'LightMode',
  ...rest
}: NavBarProps) {
  return (
    <div
      {...rest}
      className={`${THEME_VARIANTS[theme]} w-full h-full border-b border-black p-5 flex items-center justify-between`}
    >
      <Text type="span" className="ml-4">
        {'ZigLog'}
      </Text>
      <div className="flex ml-auto space-x-4 items-center">
        {login ? (
          <>
            <IconButton
              name={type === 'LightMode' ? 'LightMode' : 'DarkMode'}
            />
            <IconButton name="MyPage" />
            <IconButton name="Search" />
            <Button label="로그아웃" color="charcol" />
          </>
        ) : (
          <>
            <IconButton
              name={type === 'LightMode' ? 'LightMode' : 'DarkMode'}
            />
            <IconButton name="Search" />
            <Button label="로그인" color="charcol" />
          </>
        )}
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-white text-black shadow-dark-500/50',
  dark: 'bg-dark-background-page text-white shadow-white-500/50',
};
