import type { Meta, StoryObj } from '@storybook/react';
import NodeSample from '@components/common/NodeSample';

const meta: Meta<typeof NodeSample> = {
  title: 'components/common/NodeSample',
  component: NodeSample,
} satisfies Meta<typeof NodeSample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NodeSampleExample = {
  args: { type: 'root', theme: 'light' },
} satisfies Story;
