import type { Meta, StoryObj } from '@storybook/react';
import NoteLoading from '@components/common/NoteLoading';

const meta: Meta<typeof NoteLoading> = {
  title: 'components/common/NoteLoading',
  component: NoteLoading,
} satisfies Meta<typeof NoteLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoteLoadingExample = {
  args: {},
} satisfies Story;
