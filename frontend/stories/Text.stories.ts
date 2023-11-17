import type { Meta, StoryObj } from '@storybook/react';
import Text from '@components/common/Text';

const meta: Meta<typeof Text> = {
  title: 'components/common/Text',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextExample = {
  args: {
    type: 'h1',
    children: '안녕하세요 텍스트입니다',
  },
} satisfies Story;
