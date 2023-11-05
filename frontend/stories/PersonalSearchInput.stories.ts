import type { Meta, StoryObj } from '@storybook/react';
import PersonalSearchInput from '@components/userPage/SideBar/PersonalSearchInput';

const meta: Meta<typeof PersonalSearchInput> = {
  title: 'components/userPage/SideBar/PersonalSearchInput',
  component: PersonalSearchInput,
} satisfies Meta<typeof PersonalSearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PersonalSearchInputExample = {
  args: {
    theme: 'light',
    placeholder: '노트검색',
  },
} satisfies Story;
