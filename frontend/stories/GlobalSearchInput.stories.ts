import type { Meta, StoryObj } from '@storybook/react';
import GlobalSearchInput from '@components/common/GlobalSearchInput';

const meta: Meta<typeof GlobalSearchInput> = {
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
