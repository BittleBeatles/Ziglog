import type { Meta, StoryObj } from '@storybook/react';
import SideBar from '@components/userPage/SideBar';

const meta: Meta<typeof SideBar> = {
  component: SideBar,
} satisfies Meta<typeof SideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SideBarExample = {
  args: {
    theme: 'light',
  },
} satisfies Story;
