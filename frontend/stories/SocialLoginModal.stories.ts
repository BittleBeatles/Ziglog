import type { Meta, StoryObj } from '@storybook/react';
import SocialLoginModal from '@components/common/SocialLoginModal';

const meta: Meta<typeof SocialLoginModal> = {
  title: 'components/common/SocialLoginBox',
  component: SocialLoginModal,
} satisfies Meta<typeof SocialLoginModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SocialLoginModalExample = {
  args: {
    theme: 'light',
  },
} satisfies Story;
