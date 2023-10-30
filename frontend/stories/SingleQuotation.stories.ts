import type { Meta, StoryObj } from '@storybook/react';
import SingleQuotation from '@components/userPage/QuotationModal/SingleQuotation';

const meta: Meta<typeof SingleQuotation> = {
  title: 'components/userPage/QuotationModal/SingleQuotation',
  component: SingleQuotation,
} satisfies Meta<typeof SingleQuotation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleQuotationExample = {
  args: {
    theme: 'light',
    isBookMarked: true,
    title: '참조 모달',
    nickname: 'frog_slayer',
  },
} satisfies Story;
