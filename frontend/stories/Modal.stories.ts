import type { Meta, StoryObj } from '@storybook/react';
import Modal from '@components/common/ModalLayout';

const meta: Meta<typeof Modal> = {
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ModalLayoutExample = {
  args: {
    children: 'this is modal',
    size: 'small',
  },
} satisfies Story;
