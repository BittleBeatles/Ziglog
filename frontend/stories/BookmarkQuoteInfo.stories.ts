import type { Meta, StoryObj } from '@storybook/react';
import BookmarkQuoteInfo from '@components/common/BookmarkQuoteInfo';

const meta: Meta<typeof BookmarkQuoteInfo> = {
  component: BookmarkQuoteInfo,
} satisfies Meta<typeof BookmarkQuoteInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BookmarkQuoteInfoExample = {
  args: {
    theme: 'light',
  },
} satisfies Story;
