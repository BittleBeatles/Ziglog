import type { Meta, StoryObj } from '@storybook/react';
import ChangeUserInfoBox from '@components/userPage/ChangeUserInfoBox';

const meta: Meta<typeof ChangeUserInfoBox> = {
  title: 'components/userPage/ChangeUserInfoBox',
  component: ChangeUserInfoBox,
} satisfies Meta<typeof ChangeUserInfoBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ChangeUserInfoBoxExample = {
  args: {
    theme: 'light',
  },
} satisfies Story;
