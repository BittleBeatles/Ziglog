'use client';
import { HTMLAttributes, useState } from 'react';
import Button from '@components/common/Button';
import IconButton from '@components/common/IconButton';
import { useAppSelector, useAppDispatch } from '@store/store';
import { setMyTheme } from '@store/modules/userSlice';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@public/images/logo.png';
import SocialLoginModal from './SocialLoginModal';
import { Logout } from '@api/user/user';

interface NavBarProps {
  isLogin: boolean;
  theme: 'light' | 'dark';
}

export default function NavBar({ isLogin, theme }: NavBarProps) {
  const dispatch = useAppDispatch();
  const [isModalOpen, loginModalOpen] = useState(false);
  const openLoginModal = (open: boolean) => {
    loginModalOpen(open);
  };

  return (
    <div
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
        {isLogin && (
          <Link href={`/user-page/${'SeongYong'}`}>
            <IconButton name="MyPage" theme={theme} size={24} />
          </Link>
        )}
        <Link href={`/search`}>
          <IconButton name="Search" theme={theme} size={24} />
        </Link>
        {isLogin ? (
          <Button
            onClick={() => {
              Logout();
            }}
            label="로그아웃"
            color="charcol"
          />
        ) : (
          <Button
            onClick={() => openLoginModal(true)}
            label="로그인"
            color="charcol"
          />
        )}
      </div>
      {isModalOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <SocialLoginModal theme={theme} openLoginModal={openLoginModal} />
        </div>
      ) : undefined}
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-white text-black shadow-dark-500/50',
  dark: 'bg-dark-background-layout text-white shadow-white-500/50',
};
