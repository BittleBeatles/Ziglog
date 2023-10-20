import type { Meta, StoryObj } from '@storybook/react';
import IconButton from '@components/userPage/IconButton';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconButtonExample = {
  args: {
    name: 'addFolder',
  },
} satisfies Story;
