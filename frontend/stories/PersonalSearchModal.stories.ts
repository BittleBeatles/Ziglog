import type { Meta, StoryObj } from '@storybook/react';
import PersonalSearchModal from '@components/userPage/PersonalSearchModal';

const meta: Meta<typeof PersonalSearchModal> = {
  title: 'components/userPage/PersonalSearchModal',
  component: PersonalSearchModal,
} satisfies Meta<typeof PersonalSearchModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PersonalSearchModalExample = {
  args: {
    theme: 'light',
    // notes: [
    //   {
    //     noteId: 1,
    //     title: '안녕하세용가리랄라룰루룰루루랄라라랄',
    //     preview:
    //       '1 도커 등장 1. 서버 운영의 발전사  자체 서버 운영 → 설정 관리 도구 → 가상머신 → 클라우드 → PaaS → 도커 → 쿠버네티스 → 서비스 메시  1. 자체 서버 운영   서버 주문부터 시작해서 서버 설정을 위해 많은 노력과 시간이 필요  성능이 좋은 걸 미리 구매하고 효율적인 사용을 위해 여러 앱들을 설치할 필요가 있음   해결 노력 - 문서화)',
    //     postTime: new Date('2023.11.10 12:00'),
    //     bookmarkCount: 15,
    //   },
    //   {
    //     noteId: 2,
    //     title: '하이하이하이',
    //     preview:
    //       '1. 자체 서버 운영   서버 주문부터 시작해서 서버 설정을 위해 많은 노력과 시간이 필요  성능이 좋은 걸 미리 구매하고 효율적인 사용을 위해 여러 앱들을 설치할 필요가 있음   해결 노력 - 문서화)',
    //     postTime: new Date('2023.11.10 12:00'),
    //     bookmarkCount: 15,
    //   },
    //   {
    //     noteId: 3,
    //     title: '3번 노트',
    //     preview: '글을 적어봅시다. 이것은 프리뷰 입니다.',
    //     postTime: new Date('2023.11.10 12:00'),
    //     bookmarkCount: 15,
    //   },
    //   {
    //     noteId: 4,
    //     title: '이건 뭐지...',
    //     preview: '리락쿠마는 짱이다. 다른 어떤 캐릭터들보다 귀엽다.',
    //     postTime: new Date('2023.11.10 12:00'),
    //     bookmarkCount: 15,
    //   },
    //   {
    //     noteId: 5,
    //     title: '집 가고싶다',
    //     preview: '금요일 퇴근 1시간 전. 그 어느때보다도 집이 가고싶다...',
    //     postTime: new Date('2023.11.10 12:00'),
    //     bookmarkCount: 15,
    //   },
    //   {
    //     noteId: 6,
    //     title: '아니 대체 왜 이러는지 아시는분',
    //     preview:
    //       '제 닉네임은 탈퇴한회원 입니다. 실제로 탈퇴를 하지는 않았습니다.',
    //     postTime: new Date('2023.11.10 12:00'),
    //     bookmarkCount: 15,
    //   },
    //   {
    //     noteId: 4,
    //     title: '이건 뭐지...',
    //     preview: '리락쿠마는 짱이다. 다른 어떤 캐릭터들보다 귀엽다.',
    //     postTime: new Date('2023.11.10 12:00'),
    //     bookmarkCount: 15,
    //   },
    //   {
    //     noteId: 5,
    //     title: '집 가고싶다',
    //     preview: '금요일 퇴근 1시간 전. 그 어느때보다도 집이 가고싶다...',
    //     postTime: new Date('2023.11.10 12:00'),
    //     bookmarkCount: 15,
    //   },
    //   {
    //     noteId: 6,
    //     title: '아니 대체 왜 이러는지 아시는분',
    //     preview:
    //       '제 닉네임은 탈퇴한회원 입니다. 실제로 탈퇴를 하지는 않았습니다.',
    //     postTime: new Date('2023.11.10 12:00'),
    //     bookmarkCount: 15,
    //   },
    // ],
    nickname: '탈퇴한회원',
  },
} satisfies Story;
