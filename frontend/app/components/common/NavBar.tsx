'use client';
import { HTMLAttributes } from 'react';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import IconButton from '@components/common/IconButton';
import { useAppSelector, useAppDispatch } from '@store/store';
import { setMyTheme } from '@store/modules/userSlice';

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
  login: boolean;
}

export default function NavBar({ login, ...rest }: NavBarProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.userReducer.theme);
  return (
    <div
      {...rest}
      className={`${THEME_VARIANTS[theme]} w-full h-full border-b border-black p-5 flex items-center justify-between`}
    >
      <Text type="span" className="ml-4">
        {'ZigLog'}
      </Text>
      <div className="flex ml-auto space-x-4 items-center">
        <IconButton
          onClick={() =>
            dispatch(setMyTheme(theme === 'light' ? 'dark' : 'light'))
          }
          name={theme === 'light' ? 'LightMode' : 'DarkMode'}
          theme={theme}
          size={24}
        />
        {login && <IconButton name="MyPage" theme={theme} size={24} />}
        <IconButton name="Search" theme={theme} size={24} />
        <Button label={login ? '로그아웃' : '로그인'} color="charcol" />
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-white text-black shadow-dark-500/50',
  dark: 'bg-dark-background-page text-white shadow-white-500/50',
};
