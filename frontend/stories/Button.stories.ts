import type { Meta, StoryObj } from '@storybook/react';
import Button from '@components/common/Button';

const meta: Meta<typeof Button> = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonExample = {
  args: {
    color: 'charcol',
    label: '로그인',
  },
} satisfies Story;
