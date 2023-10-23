import type { Meta, StoryObj } from '@storybook/react';
import SvgIcon from '@components/common/SvgIcon';

const meta: Meta<typeof SvgIcon> = {
  component: SvgIcon,
} satisfies Meta<typeof SvgIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SvgIconExample = {
  args: {
    name: 'ArrowDown',
    size: 24,
    color: 'black',
  },
} satisfies Story;
