import type { Meta, StoryObj } from '@storybook/react';
import Directory from '@components/userPage/SideBar/Directory';

const meta: Meta<typeof Directory> = {
  title: 'components/userPage/SideBar/Directory',
  component: Directory,
} satisfies Meta<typeof Directory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DirectoryExample = {
  args: {
    theme: 'light',
  },
} satisfies Story;
