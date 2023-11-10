import type { Meta, StoryObj } from '@storybook/react';
import GraphView from '@components/userPage/GraphView';

const meta: Meta<typeof GraphView> = {
  title: 'components/userPage/GraphView',
  component: GraphView,
} satisfies Meta<typeof GraphView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GraphViewExample = {
  args: {},
} satisfies Story;
