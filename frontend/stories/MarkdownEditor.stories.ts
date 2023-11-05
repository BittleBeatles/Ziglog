import type { Meta, StoryObj } from '@storybook/react';
import MarkdownEditor from '@components/userPage/MarkdownEditor';

const meta: Meta<typeof MarkdownEditor> = {
  component: MarkdownEditor,
} satisfies Meta<typeof MarkdownEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MarkdownEditorExample = {
  args: {},
} satisfies Story;
