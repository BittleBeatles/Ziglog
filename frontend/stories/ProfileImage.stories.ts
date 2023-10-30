import type { Meta, StoryObj } from '@storybook/react';
import ProfileImage from '@components/common/ProfileImage';

const meta: Meta<typeof ProfileImage> = {
  title: 'components/common/ProfileImage',
  component: ProfileImage,
} satisfies Meta<typeof ProfileImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProfileImageExample = {
  args: {
    size: 50,
  },
} satisfies Story;
