import type { Meta, StoryObj } from '@storybook/react';
import ProfileChangeButton from '@components/common/ProfileChangeButton';

const meta: Meta<typeof ProfileChangeButton> = {
  component: ProfileChangeButton,
} satisfies Meta<typeof ProfileChangeButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProfileChangeButtonExample = {
  args: {},
};
