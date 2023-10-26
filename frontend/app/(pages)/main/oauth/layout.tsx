import { ReactNode } from 'react';

export default function OauthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>OAUTH임!!!</h1>
      {children}
    </div>
  );
}
