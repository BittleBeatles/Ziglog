'use client';
import { HTMLAttributes } from 'react';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import SvgIcon from './SvgIcon';

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
  login: boolean;
  theme?: 'light' | 'dark';
}

export default function NavBar({
  login,
  theme = 'light',
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
      <div className="flex ml-auto">
        {login ? (
          <div className="flex space-x-4 items-center">
            <SvgIcon name={theme === 'light' ? 'LightMode' : 'DarkMode'} />
            <SvgIcon name="MyPage" />
            <SvgIcon name="Search" />
            <Button label="로그아웃" color="charcol" />
          </div>
        ) : (
          <div className="flex space-x-4 items-center">
            <SvgIcon name={theme === 'light' ? 'LightMode' : 'DarkMode'} />
            <SvgIcon name="Search" />
            <Button label="로그인" color="charcol" />
          </div>
        )}
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-white text-black shadow-dark-500/50',
  dark: 'bg-dark-background-page text-white shadow-white-500/50',
};
