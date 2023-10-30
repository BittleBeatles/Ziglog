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
        userNickname: 'SeongYong',
        title: 'Study JavaScript Basics',
      },
      {
        noteId: 2,
        userNickname: 'SeongYong',
        title: 'Understanding TypeScript',
      },
      {
        noteId: 3,
        userNickname: 'SeongYong',
        title: 'Exploring React Hooks',
      },
      {
        noteId: 4,
        userNickname: 'SeongYong',
        title: 'Diving into Node.js',
      },
      {
        noteId: 5,
        userNickname: 'SeongYong',
        title: 'GraphQL Introduction',
      },
      {
        noteId: 6,
        userNickname: 'SeongYong',
        title: 'Understanding TypeScript',
      },
      {
        noteId: 7,
        userNickname: 'SeongYong',
        title: 'Exploring React Hooks',
      },
      {
        noteId: 8,
        userNickname: 'SeongYong',
        title: 'Diving into Node.js',
      },
      {
        noteId: 9,
        userNickname: 'SeongYong',
        title: 'GraphQL Introduction',
      },
      {
        noteId: 10,
        userNickname: 'SeongYong',
        title: 'Understanding TypeScript',
      },
      {
        noteId: 11,
        userNickname: 'SeongYong',
        title: 'Exploring React Hooks',
      },
      {
        noteId: 12,
        userNickname: 'SeongYong',
        title: 'Diving into Node.js',
      },
      {
        noteId: 13,
        userNickname: 'SeongYong',
        title: 'GraphQL Introduction',
      },
    ],
  },
} satisfies Story;
