import type { Meta, StoryObj } from '@storybook/react';
import NicknameSetting from '@components/userPage/NicknameSetting';

const meta: Meta<typeof NicknameSetting> = {
  title: 'components/userPage/NicknameSetting',
  component: NicknameSetting,
} satisfies Meta<typeof NicknameSetting>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NicknameSettingExample = {
  args: {
    theme: 'light',
  },
} satisfies Story;
