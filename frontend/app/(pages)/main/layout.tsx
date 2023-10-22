import NavBar from '@components/common/NavBar';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>메인 네브바 입니다</h1>
      <NavBar login={false} />
      {children}
    </div>
  );
}
