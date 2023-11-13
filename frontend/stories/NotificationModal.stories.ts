import type { Meta, StoryObj } from '@storybook/react';
import NotificationModal from '@components/userPage/Notification/NotificationModal';

const meta: Meta<typeof NotificationModal> = {
  title: 'components/userPage/Notification/NotificationModal',
  component: NotificationModal,
} satisfies Meta<typeof NotificationModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotificationModalExample = {
  args: {
    theme: 'light',
  },
} satisfies Story;
