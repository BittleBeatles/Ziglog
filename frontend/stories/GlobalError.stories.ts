import type { Meta, StoryObj } from '@storybook/react';
import GlobalError from 'app/global-error';

const meta: Meta<typeof GlobalError> = {
  title: 'page/GlobalError',
  component: GlobalError,
} satisfies Meta<typeof GlobalError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GlobalErrorExample = {
  args: {},
} satisfies Story;
