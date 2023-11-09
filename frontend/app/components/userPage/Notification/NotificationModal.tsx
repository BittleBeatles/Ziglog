'use client';
import ModalLayout from '@components/common/ModalLayout';
import Text from '@components/common/Text';
import NotificationButton from '@components/userPage/Notification/NotificationButton';

interface NotificationModalProps {
  theme: 'light' | 'dark';
}

export default function NotificationModal({ theme }: NotificationModalProps) {
  return (
    <ModalLayout classname={`${THEME_VARIANTS[theme]} px-20`}>
      <div>
        <Text type="h4">{'알림'}</Text>
        <div></div>
        <NotificationButton label="전체" isSelected={true}></NotificationButton>
        <NotificationButton
          label="북마크"
          isSelected={false}
        ></NotificationButton>
        <NotificationButton
          label="인용"
          isSelected={false}
        ></NotificationButton>
      </div>
    </ModalLayout>
  );
}

const THEME_VARIANTS = {
  light: 'bg-modal',
  dark: 'bg-dark-background-page text-white',
};
