import type { Meta, StoryObj } from '@storybook/react';
import SvgIcon from '@components/common/SvgIcon';

const meta: Meta<typeof SvgIcon> = {
  component: SvgIcon,
} satisfies Meta<typeof SvgIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconExample = {
  args: {
    name: 'arrowDown',
    size: 24,
  },
} satisfies Story;
