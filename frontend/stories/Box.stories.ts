import type { Meta, StoryObj } from '@storybook/react';
import Box from '@components/common/Box';

const meta: Meta<typeof Box> = {
  title: 'components/common/Box',
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BoxExample = {
  args: {
    children: '안녕하세요 화이트박스입니다',
    theme: 'light',
  },
} satisfies Story;
