import type { Meta, StoryObj } from '@storybook/react';
import GlobalSearchResult from '@components/search/GlobalSearchResult';

const meta: Meta<typeof GlobalSearchResult> = {
  component: GlobalSearchResult,
} satisfies Meta<typeof GlobalSearchResult>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GlobalSearchResultExample = {
  args: {
    theme: 'light',
  },
} satisfies Story;
