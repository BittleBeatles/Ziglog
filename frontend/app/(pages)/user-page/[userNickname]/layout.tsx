'use client';
import Box from '@components/common/Box';
import IconButton from '@components/common/IconButton';
import SideBar from '@components/userPage/SideBar';
import { ReactNode, useState } from 'react';

export default function UserLayout({ children }: { children: ReactNode }) {
  const [isSideBarOpen, setSideBarOpen] = useState(true);
  const theme = 'light';
  return (
    <div className="flex bg-light-background-layout">
      {isSideBarOpen && (
        <div className="w-1/6">
          <SideBar setSideBarOpen={setSideBarOpen} theme={theme} />
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
    </div>
  );
}
