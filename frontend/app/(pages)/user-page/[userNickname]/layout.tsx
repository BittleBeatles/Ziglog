import Box from '@components/common/Box';
import SideBar from '@components/userPage/SideBar';
import { ReactNode } from 'react';

export default function UserLayout({ children }: { children: ReactNode }) {
  const theme = 'light';
  return (
    <div className="flex bg-light-background-layout">
      <div className=" w-1/5">
        <SideBar theme={theme} />
      </div>
      <div className="p-4 w-4/5">
        <Box theme={theme}>{children}</Box>
      </div>
    </div>
  );
}
