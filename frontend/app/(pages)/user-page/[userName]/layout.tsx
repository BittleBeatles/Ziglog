import { ReactNode } from 'react';

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>사이드바입니다.</h1>
      {children}
    </div>
  );
}
