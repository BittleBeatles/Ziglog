import type { Meta, StoryObj } from '@storybook/react';
import WhiteBox from '@components/common/WhiteBox';

const meta: Meta<typeof WhiteBox> = {
  component: WhiteBox,
} satisfies Meta<typeof WhiteBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WhiteBoxExample = {
  args: {
    children: '안녕하세요 화이트박스입니다',
  },
} satisfies Story;
