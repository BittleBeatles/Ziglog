import type { Meta, StoryObj } from '@storybook/react';
import BookmarkCheckBox from '@components/userPage/BookmarkCheckBox';

const meta: Meta<typeof BookmarkCheckBox> = {
  title: 'components/userPage/SideBar/BookmarkList',
  component: BookmarkCheckBox,
} satisfies Meta<typeof BookmarkCheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BookmarkCheckBoxExample = {
  args: {
    theme: 'light',
    bookmarkList: [
      {
        noteId: 1,
        nickname: 'SeongYong',
        title: 'Study JavaScript Basics',
        isPublic: true,
      },
      {
        noteId: 2,
        nickname: 'SeongYong',
        title: 'Understanding TypeScript',
        isPublic: true,
      },
      {
        noteId: 3,
        nickname: 'SeongYong',
        title: 'Exploring React Hooks',
        isPublic: true,
      },
      {
        noteId: 4,
        nickname: 'SeongYong',
        title: 'Diving into Node.js',
        isPublic: true,
      },
      {
        noteId: 5,
        nickname: 'SeongYong',
        title: 'GraphQL Introduction',
        isPublic: true,
      },
      {
        noteId: 6,
        nickname: 'SeongYong',
        title: 'Understanding TypeScript',
        isPublic: true,
      },
      {
        noteId: 7,
        nickname: 'SeongYong',
        title: 'Exploring React Hooks',
        isPublic: true,
      },
      {
        noteId: 8,
        nickname: 'SeongYong',
        title: 'Diving into Node.js',
        isPublic: true,
      },
      {
        noteId: 9,
        nickname: 'SeongYong',
        title: 'GraphQL Introduction',
        isPublic: true,
      },
      {
        noteId: 10,
        nickname: 'SeongYong',
        title: 'Understanding TypeScript',
        isPublic: true,
      },
      {
        noteId: 11,
        nickname: 'SeongYong',
        title: 'Exploring React Hooks',
        isPublic: true,
      },
      {
        noteId: 12,
        nickname: 'SeongYong',
        title: 'Diving into Node.js',
        isPublic: true,
      },
      {
        noteId: 13,
        nickname: 'SeongYong',
        title: 'GraphQL Introduction',
        isPublic: true,
      },
    ],
    quotingNotes: [1, 2],
  },
} satisfies Story;
