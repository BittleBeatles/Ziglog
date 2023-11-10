import type { Meta, StoryObj } from '@storybook/react';
import SingleNotification from '@components/userPage/SingleNotification';

const meta: Meta<typeof SingleNotification> = {
  title: 'components/userPage/SingleNotification',
  component: SingleNotification,
} satisfies Meta<typeof SingleNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleNotificationExample = {
  args: {
    theme: 'light',
    isRead: false,
    type: 'bookmark',
    noteTitle: '리락쿠마가 짱이다.',
    userNickname: '탈퇴한회원',
    date: new Date('2023.11.08 14:29'),
  },
} satisfies Story;