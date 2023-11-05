import type { Meta, StoryObj } from '@storybook/react';
import SocialLoginBox from '@components/common/SocialLoginBox';

const meta: Meta<typeof SocialLoginBox> = {
  title: 'components/common/SocialLoginBox',
  component: SocialLoginBox,
} satisfies Meta<typeof SocialLoginBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SocialLoginBoxExample = {
  args: {
    theme: 'light',
  },
} satisfies Story;
