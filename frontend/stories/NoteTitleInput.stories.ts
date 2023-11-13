import type { Meta, StoryObj } from '@storybook/react';
import NoteTitleInput from '@components/userPage/NoteTitleInput';

const meta: Meta<typeof NoteTitleInput> = {
  title: 'components/userPage/NoteTitleInput',
  component: NoteTitleInput,
} satisfies Meta<typeof NoteTitleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoteTitleInputExample = {
  args: { theme: 'light' },
} satisfies Story;
