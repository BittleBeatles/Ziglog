import NavBar from '@components/common/NavBar';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar isLogin={false} theme={'light'} />
      {children}
    </div>
  );
}
