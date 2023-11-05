import type { Meta, StoryObj } from '@storybook/react';
import Directory from '@components/userPage/SideBar/Directory';

const meta: Meta<typeof Directory> = {
  title: 'components/userPage/SideBar/Directory',
  component: Directory,
} satisfies Meta<typeof Directory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DirectoryExample = {
  args: {
    sideData: [
      {
        type: 'folder',
        id: 1,
        title: 'React',
        isPublic: true,
        notes: [
          {
            type: 'note',
            id: 1,
            isPublic: true,
            title: 'React 1강 기초',
          },
          {
            type: 'folder',
            id: 2,
            title: 'components',
            isPublic: true,
            notes: [
              {
                type: 'note',
                id: 2,
                isPublic: true,
                title: 'React 2강 훅스',
              },
            ],
          },
        ],
      },
      {
        type: 'folder',
        id: 3,
        title: 'Vue',
        isPublic: true,
        notes: [
          {
            type: 'note',
            id: 3,
            isPublic: true,
            title: 'Vue 1강 기초',
          },
        ],
      },
    ],

    theme: 'light',
  },
} satisfies Story;
