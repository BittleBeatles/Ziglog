import type { Meta, StoryObj } from '@storybook/react';
import BookmarkList from '@components/userPage/SideBar/BookmarkList';

const meta: Meta<typeof BookmarkList> = {
  title: 'components/userPage/SideBar/BookmarkList',
  component: BookmarkList,
} satisfies Meta<typeof BookmarkList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BookmarkListExample = {
  args: {
    noteList: [
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
  },
} satisfies Story;
