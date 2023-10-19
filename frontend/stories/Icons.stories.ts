import type { Meta, StoryObj } from '@storybook/react';
import SvgIcons from '@components/common/Icons';

const meta: Meta<typeof SvgIcons> = {
  component: SvgIcons,
} satisfies Meta<typeof SvgIcons>;

export default meta;

type Story = StoryObj<typeof meta>;
