'use client';
import NavBar from '@components/common/NavBar';
import { ReactNode } from 'react';
import { useAppSelector } from '../../store/store';

export default function SearchLayout({ children }: { children: ReactNode }) {
  const { theme, isLogin } = useAppSelector((state) => state.user);
  return (
    <div>
      <NavBar theme={theme} isLogin={isLogin} />
      {children}
    </div>
  );
}
