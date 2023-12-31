'use client';
import { useState } from 'react';
import Button from '@components/common/Button';
import IconButton from '@components/common/IconButton';
import { useAppDispatch, useAppSelector } from '@store/store';
import { logOut, setMyTheme } from '@store/modules/userSlice';
import Link from 'next/link';
import Image from 'next/image';
import logolight from '@public/images/logo-light.png';
import logodark from '@public/images/logo-dark.png';
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
  const { nickname } = useAppSelector((state) => state.user);
  return (
    <div
      className={`${THEME_VARIANTS[theme]} w-full p-5 flex items-center justify-between`}
    >
      <Link href={'/'}>
        {theme == 'light' ? (
          <Image
            src={logolight}
            alt="logo"
            width={0}
            height={0}
            className="w-14"
          />
        ) : (
          <Image
            src={logodark}
            alt="logo"
            width={0}
            height={0}
            className="w-14"
          />
        )}
      </Link>
      <div className="flex gap-4 justify-between items-center">
        <IconButton
          onClick={() =>
            dispatch(setMyTheme(theme === 'light' ? 'dark' : 'light'))
          }
          name={theme === 'light' ? 'LightMode' : 'DarkMode'}
          theme={theme}
          size={24}
          aria-label="Theme"
        />
        {isLogin && (
          <Link
            className="flex items-center"
            href={`/user-page/${nickname}`}
            aria-label="Move to user-page"
          >
            <IconButton name="MyPage" theme={theme} size={24} id="MyPage" />
          </Link>
        )}
        <Link className="flex items-center" href={`/search`}>
          <IconButton
            name="Search"
            theme={theme}
            size={24}
            id="Search"
            aria-label="Move to search-page"
          />
        </Link>
        {isLogin ? (
          <Button
            className="flex items-center"
            onClick={() => {
              Logout();
            }}
            label="로그아웃"
            color="charcol"
            id="Logout"
          />
        ) : (
          <Button
            className="flex items-center"
            onClick={() => openLoginModal(true)}
            label="로그인"
            color="charcol"
            id="Login"
          />
        )}
      </div>
      {isModalOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
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
