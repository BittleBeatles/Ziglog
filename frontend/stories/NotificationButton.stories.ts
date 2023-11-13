import type { Meta, StoryObj } from '@storybook/react';
import NotificationButton from '@components/userPage/Notification/NotificationButton';

const meta: Meta<typeof NotificationButton> = {
  title: 'components/userPage/Notification/NotificationButton',
  component: NotificationButton,
} satisfies Meta<typeof NotificationButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotificationButtonExample = {
  args: {
    label: '전체',
  },
} satisfies Story;
