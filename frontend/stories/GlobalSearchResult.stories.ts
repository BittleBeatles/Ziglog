import type { Meta, StoryObj } from '@storybook/react';
import GlobalSearchResult from '@components/search/GlobalSearchResult';

const meta: Meta<typeof GlobalSearchResult> = {
  title: 'components/search/GlobalSearchResult',
  component: GlobalSearchResult,
} satisfies Meta<typeof GlobalSearchResult>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GlobalSearchResultExample = {
  args: {
    noteId: 12345,
    title: '제목 예시',
    preview: '노트 검색 결과 컨텐츠 입니다',
    nickname: '사용자닉네임',
    isPublic: true,
    bookmarkCount: 100,
    postTime: new Date('2023-10-28T14:00:00Z'),
    editTime: null,
    theme: 'light',
  },
} satisfies Story;
