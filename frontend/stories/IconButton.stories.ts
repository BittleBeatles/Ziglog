import type { Meta, StoryObj } from '@storybook/react';
import IconButton from '@components/common/IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'components/common/IconButton',
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconButtonExample = {
  args: {
    name: 'AddFolder',
    theme: 'light',
    size: 24,
  },
} satisfies Story;
