import type { Meta, StoryObj } from '@storybook/react';
import CreateFile from '@components/userPage/SideBar/Directory/CreateFile';

const meta: Meta<typeof CreateFile> = {
  title: 'components/userPage/SideBar/Directory/CreateFile',
  component: CreateFile,
} satisfies Meta<typeof CreateFile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CreateFileExample = {
  args: {
    type: 'folder',
  },
} satisfies Story;
