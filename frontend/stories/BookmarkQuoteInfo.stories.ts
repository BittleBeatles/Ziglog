import type { Meta, StoryObj } from '@storybook/react';
import BookmarkQuoteInfo from '@components/userPage/BookmarkQuoteInfo';

const meta: Meta<typeof BookmarkQuoteInfo> = {
  title: 'components/userPage/BookmarkQuoteInfo',
  component: BookmarkQuoteInfo,
} satisfies Meta<typeof BookmarkQuoteInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BookmarkQuoteInfoExample = {
  args: {
    theme: 'light',
  },
} satisfies Story;
