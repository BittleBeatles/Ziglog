'use client';
import ModalLayout from '@components/common/ModalLayout';
import Text from '@components/common/Text';
import NotificationButton from '@components/userPage/Notification/NotificationButton';

interface NotificationModalProps {
  theme: 'light' | 'dark';
  isSelected: '전체' | '북마크' | '인용';
}

export default function NotificationModal({
  theme,
  isSelected,
}: NotificationModalProps) {
  return (
    <ModalLayout classname={`${THEME_VARIANTS[theme]} px-10`}>
      <div className="">
        <Text type="h4">{'알림'}</Text>
        <div className={`${THEME_VARIANTS[theme]} border-t my-2`}></div>
        <div className="flex justify-evenly gap-2">
          <NotificationButton
            label="전체"
            isSelected={true}
          ></NotificationButton>
          <NotificationButton
            label="북마크"
            isSelected={false}
          ></NotificationButton>
          <NotificationButton
            label="인용"
            isSelected={false}
          ></NotificationButton>
        </div>
        <div></div>
      </div>
    </ModalLayout>
  );
}

const THEME_VARIANTS = {
  light: 'bg-modal border border-black',
  dark: 'bg-dark-background-page text-white border border-white',
};
