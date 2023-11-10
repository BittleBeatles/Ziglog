import type { Meta, StoryObj } from '@storybook/react';
import PersonalSearchResult from '@components/userPage/Search/PersonalSearchResult';

const meta: Meta<typeof PersonalSearchResult> = {
  title: 'components/userPage/Search/PersonalSearchResult',
  component: PersonalSearchResult,
} satisfies Meta<typeof PersonalSearchResult>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PersonalSearchResultExample = {
  args: {
    theme: 'light',
    title: '안녕하세용가리랄라룰루룰루루랄라라랄',
    preview:
      '1 도커 등장 1. 서버 운영의 발전사  자체 서버 운영 → 설정 관리 도구 → 가상머신 → 클라우드 → PaaS → 도커 → 쿠버네티스 → 서비스 메시  1. 자체 서버 운영   서버 주문부터 시작해서 서버 설정을 위해 많은 노력과 시간이 필요  성능이 좋은 걸 미리 구매하고 효율적인 사용을 위해 여러 앱들을 설치할 필요가 있음   해결 노력 - 문서화)',
    postTime: new Date('2023.11.10 12:00'),
    bookmarkCount: 15,
  },
} satisfies Story;
