import type { Meta, StoryObj } from '@storybook/react';
import QuotationModal from '@components/userPage/QuotationModal';

const meta: Meta<typeof QuotationModal> = {
  component: QuotationModal,
} satisfies Meta<typeof QuotationModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const QuotationModalExample = {
  args: {},
} satisfies Story;
