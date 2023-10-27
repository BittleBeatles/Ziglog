import type { Meta, StoryObj } from '@storybook/react';
import Directory from '@components/userPage/SideBar/Directory';

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
        folderId: 1,
        title: 'React',
        notes: [
          {
            type: 'note',
            nickname: 'seongyong',
            noteId: 1,
            title: 'React 1강 기초',
          },
          {
            type: 'folder',
            folderId: 2,
            title: 'components',
            notes: [
              {
                type: 'note',
                nickname: 'seongyong',
                noteId: 2,
                title: 'React 2강 훅스',
              },
            ],
          },
        ],
      },
      {
        type: 'folder',
        folderId: 3,
        title: 'Vue',
        notes: [
          {
            type: 'note',
            nickname: 'seongyong',
            noteId: 3,
            title: 'Vue 1강 기초',
          },
        ],
      },
    ],
    theme: 'light',
  },
} satisfies Story;
