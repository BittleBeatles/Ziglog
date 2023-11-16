import type { Meta, StoryObj } from '@storybook/react';
import SingleNotification from '@components/userPage/Notification/SingleNotification';

const meta: Meta<typeof SingleNotification> = {
  title: 'components/userPage/Notification/SingleNotification',
  component: SingleNotification,
} satisfies Meta<typeof SingleNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleNotificationExample = {
  args: {
    id: '19_abcd',
    noteId: 256,
    theme: 'light',
    isRead: false,
    type: 'bookmark',
    title: '리락쿠마가 짱이다.',
    senderNickname: '탈퇴한회원',
    senderProfileUrl:
      'https://ziglog.s3-ap-northeast-2.amazonaws.com/profile/짱구.jpg',
    dateTime: new Date('2023.11.08 14:29'),
  },
} satisfies Story;
