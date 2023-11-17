import type { Meta, StoryObj } from '@storybook/react';
import SocialLoginButton from '@components/common/SocialLoginButton';

const meta: Meta<typeof SocialLoginButton> = {
  title: 'components/common/SocialLoginButton',
  component: SocialLoginButton,
} satisfies Meta<typeof SocialLoginButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SocialLoginButtonExample = {
  args: {
    name: 'google',
  },
} satisfies Story;
