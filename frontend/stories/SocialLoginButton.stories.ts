import type { Meta, StoryObj } from '@storybook/react';
import SocialLoginButton from '@components/common/SocialButton';

const meta: Meta<typeof SocialLoginButton> = {
  component: SocialLoginButton,
} satisfies Meta<typeof SocialLoginButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonExample = {
  args: {
    name: 'google',
  },
} satisfies Story;
