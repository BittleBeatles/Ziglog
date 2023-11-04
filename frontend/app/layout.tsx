import './globals.css';
import type { Metadata } from 'next';
import { ReduxProvider } from '@store/provider';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: './src/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ziglog',
  description: '특화A407',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
