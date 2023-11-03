import type { Meta, StoryObj } from '@storybook/react';
import EditInput from '@components/common/EditInput';

const meta: Meta<typeof EditInput> = {
  title: 'components/common/EditInput',
  component: EditInput,
} satisfies Meta<typeof EditInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditInputExample = {
  args: { theme: 'light' },
} satisfies Story;
