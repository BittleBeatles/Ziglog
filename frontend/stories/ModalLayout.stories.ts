import type { Meta, StoryObj } from '@storybook/react';
import ModalLayout from '@components/common/ModalLayout';

const meta: Meta<typeof ModalLayout> = {
  title: 'components/common/ModalLayout',
  component: ModalLayout,
} satisfies Meta<typeof ModalLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ModalLayoutExample = {
  args: {
    children: '모달 예시입니다.',
    classname: '',
  },
} satisfies Story;
