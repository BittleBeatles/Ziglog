import type { Meta, StoryObj } from '@storybook/react';
import ArticleUserInfo from '@components/common/ArticleUserInfo';

const meta: Meta<typeof ArticleUserInfo> = {
  component: ArticleUserInfo,
} satisfies Meta<typeof ArticleUserInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ArticleUserInfoExample = {
  args: {
    theme: 'light',
  },
} satisfies Story;
