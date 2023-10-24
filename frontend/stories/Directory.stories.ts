import type { Meta, StoryObj } from '@storybook/react';
import Directory from '@components/userPage/Directory';

const meta: Meta<typeof Directory> = {
  component: Directory,
} satisfies Meta<typeof Directory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DirectoryExample = {
  args: {
    directoryList: [
      {
        type: 'folder',
        folderId: 'f1',
        name: 'React',
        notes: [
          {
            type: 'note',
            noteId: 'n1',
            name: 'React 1강 기초',
          },
          {
            type: 'folder',
            folderId: 'f2',
            name: 'components',
            notes: [
              {
                type: 'note',
                noteId: 'n2',
                name: 'React 2강 훅스',
              },
            ],
          },
        ],
      },
      {
        type: 'folder',
        folderId: 'f3',
        name: 'Vue',
        notes: [
          {
            type: 'note',
            noteId: 'n3',
            name: 'Vue 1강 기초',
          },
        ],
      },
    ],
  },
} satisfies Story;
