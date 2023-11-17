import type { Meta, StoryObj } from '@storybook/react';
import GraphConverter from '@components/common/GraphConverter';

const meta: Meta<typeof GraphConverter> = {
  title: 'components/common/GraphConverter',
  component: GraphConverter,
} satisfies Meta<typeof GraphConverter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GraphConverterExample = {
  args: {
    current: '2d',
  },
} satisfies Story;
