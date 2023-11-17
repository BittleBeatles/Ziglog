import type { Meta, StoryObj } from '@storybook/react';
import IconButtonWithBg from '@components/common/IconButtonWithBg';

const meta: Meta<typeof IconButtonWithBg> = {
  title: 'components/common/IconButtonWithBg',
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
