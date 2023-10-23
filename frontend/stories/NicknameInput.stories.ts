import type { Meta, StoryObj } from '@storybook/react';
import NicknameInput from '@components/common/NicknameInput';

const meta: Meta<typeof NicknameInput> = {
  component: NicknameInput,
} satisfies Meta<typeof NicknameInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NicknameInputExample = {
  args: {
    theme: 'light',
    nickname: '닉네임',
    placeholder: '닉네임을 입력하세요',
  },
} satisfies Story;
