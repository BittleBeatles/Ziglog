import type { Meta, StoryObj } from '@storybook/react';
import TestButton from '@components/TestButton';

const meta: Meta<typeof TestButton> = {
  component: TestButton,
} satisfies Meta<typeof TestButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example = {
  args: {
    size: 'small',
  },
} satisfies Story;
