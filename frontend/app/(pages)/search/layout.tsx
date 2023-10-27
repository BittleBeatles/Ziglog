import NavBar from '@components/common/NavBar';
import { ReactNode } from 'react';

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar login={false} />
      {children}
    </div>
  );
}
