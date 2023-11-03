import type { Meta, StoryObj } from '@storybook/react';
import GraphLoading from '@components/common/GraphLoading';

const meta: Meta<typeof GraphLoading> = {
  title: 'components/common/GraphLoading',
  component: GraphLoading,
} satisfies Meta<typeof GraphLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GraphLoadingExample = {
  args: {},
} satisfies Story;
