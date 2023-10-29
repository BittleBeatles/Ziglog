import type { Meta, StoryObj } from '@storybook/react';
import NavBar from '@components/common/NavBar';

const meta: Meta<typeof NavBar> = {
  title: 'components/common/NavBar',
  component: NavBar,
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavBarExample = {
  args: {
    login: false,
  },
} satisfies Story;
