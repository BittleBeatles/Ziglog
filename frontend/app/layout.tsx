import './globals.css';
import type { Metadata } from 'next';
import { ReduxProvider } from '@store/provider';
import localFont from 'next/font/local';
import Script from 'next/script';
const pretendard = localFont({
  src: './src/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ziglog : 지식 그래프 노트 필기 웹 서비스',
  description:
    '나만의 지식을 담을 그래프를 만드는 지그로거가 되어보세요. 마크다운 노트 필기, 그래프 보기, 전체 노트 검색, 이 모든 기능이 한 곳에. Copyright. 비틀비틀즈(임수형, 박영서, 김하늘, 김성용, 이정민, 정현아) ',
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
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
        </Script>
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
