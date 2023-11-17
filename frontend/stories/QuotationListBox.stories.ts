import type { Meta, StoryObj } from '@storybook/react';
import QuotationListBox from '@components/userPage/QuotationListBox';

const meta: Meta<typeof QuotationListBox> = {
  title: 'components/userPage/QuotationListBox',
  component: QuotationListBox,
} satisfies Meta<typeof QuotationListBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const QuotationListBoxExample = {
  args: {
    theme: 'light',
    quotationList: [],
  },
} satisfies Story;
