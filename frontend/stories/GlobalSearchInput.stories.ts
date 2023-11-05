import type { Meta, StoryObj } from '@storybook/react';
import GlobalSearchInput from '@components/search/GlobalSearchInput';

const meta: Meta<typeof GlobalSearchInput> = {
  title: 'components/search/GlobalSearchInput',
  component: GlobalSearchInput,
} satisfies Meta<typeof GlobalSearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GlobalSearchInputExample = {
  args: {
    theme: 'light',
    placeholder: '검색어를 입력해주세요',
  },
} satisfies Story;
