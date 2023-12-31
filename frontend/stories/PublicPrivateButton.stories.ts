import type { Meta, StoryObj } from '@storybook/react';
import PublicPrivateToggle from '@components/userPage/PublicPrivateToggle';

const meta: Meta<typeof PublicPrivateToggle> = {
  title: 'components/userPage/PublicPrivateToggle',
  component: PublicPrivateToggle,
} satisfies Meta<typeof PublicPrivateToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PublicPrivateToggleExample = {
  args: {
    scope: 'Private',
  },
} satisfies Story;
