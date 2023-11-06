import './globals.css';
import type { Metadata } from 'next';
import { ReduxProvider } from '@store/provider';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: './src/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ziglog : 지식 그래프 노트 필기 웹 서비스',
  description: '특화A407',
  icons: {
    icon: '/favicon.ico',
  },
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
