import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '검색 (ZigLogSearch)',
  description:
    'ZigLogS에서 글을 찾아보세요. 저희 검색 페이지를 통해 빠르고 정확한 결과얻을 수 있습니다.',
};

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
