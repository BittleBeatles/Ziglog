import type { Meta, StoryObj } from '@storybook/react';
import IconButtonWithBg from '@components/userPage/IconButtonWithBg';

const meta: Meta<typeof IconButtonWithBg> = {
  component: IconButtonWithBg,
} satisfies Meta<typeof IconButtonWithBg>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconButtonWithBgExample = {
  args: {
    name: 'AddFolder',
    theme: 'dark',
  },
} satisfies Story;
