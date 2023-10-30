'use client';
import { HTMLAttributes } from 'react';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import IconButton from '@components/common/IconButton';
import { useAppSelector, useAppDispatch } from '@store/store';
import { setMyTheme } from '@store/modules/userSlice';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@public/images/logo.png';

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
  login: boolean;
}

export default function NavBar({ login, ...rest }: NavBarProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.userReducer.theme);
  return (
    <div
      {...rest}
      className={`${THEME_VARIANTS[theme]} w-full h-full p-5 flex items-center justify-between`}
    >
      <Link href={'/'}>
        <Image src={logo} alt="logo" width={0} height={0} className="w-14" />
      </Link>
      <div className="flex ml-auto space-x-4 items-center">
        <IconButton
          onClick={() =>
            dispatch(setMyTheme(theme === 'light' ? 'dark' : 'light'))
          }
          name={theme === 'light' ? 'LightMode' : 'DarkMode'}
          theme={theme}
          size={24}
        />
        {login && (
          <Link href={`/user-page/${'SeongYong'}`}>
            <IconButton name="MyPage" theme={theme} size={24} />
          </Link>
        )}
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
