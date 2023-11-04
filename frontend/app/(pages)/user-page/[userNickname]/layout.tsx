'use client';
import Box from '@components/common/Box';
import IconButton from '@components/common/IconButton';
import SideBar from '@components/userPage/SideBar';
import { useAppSelector } from '@store/store';
import { ReactNode, useState } from 'react';
import { GraphDataProvider } from './GraphDataContext';

export default function UserLayout({ children }: { children: ReactNode }) {
  const [isSideBarOpen, setSideBarOpen] = useState(true);
  const { theme } = useAppSelector((state) => state.user);
  const sideBarToggle = () => {
    setSideBarOpen(false);
  };

  return (
    <div className={`${THEME_VARIANTS[theme]} flex`}>
      <GraphDataProvider>
        {isSideBarOpen && (
          <div className="w-1/6">
            <SideBar sideBarToggle={sideBarToggle} theme={theme} />
          </div>
        )}
        {!isSideBarOpen && (
          <IconButton
            onClick={() => setSideBarOpen(true)}
            theme={theme}
            name="DoubleArrowRight"
          />
        )}
        <div className="p-4 w-full h-screen">
          <Box theme={theme}>{children}</Box>
        </div>
      </GraphDataProvider>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-light-background-layout',
  dark: 'bg-dark-background-layout text-white',
};
