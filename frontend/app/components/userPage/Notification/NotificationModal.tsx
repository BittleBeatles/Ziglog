'use client';
import ModalLayout from '@components/common/ModalLayout';
import Text from '@components/common/Text';
import NotificationButton from '@components/userPage/Notification/NotificationButton';
import SingleNotification from './SingleNotification';
import { useState } from 'react';

interface NotificationModalProps {
  theme: 'light' | 'dark';
}

export default function NotificationModal({ theme }: NotificationModalProps) {
  const [selectedType, setSelectedType] = useState<
    'all' | 'bookmark' | 'quotation'
  >('all');
  const handleTypeChange = (newType: 'all' | 'bookmark' | 'quotation') => {
    setSelectedType(newType);
  };
  return (
    <ModalLayout classname={`${THEME_VARIANTS[theme]} px-10`}>
      <div className="">
        <Text type="h4">{'알림'}</Text>
        <div className={`${THEME_VARIANTS[theme]} border-t my-2`}></div>
        <div className="flex justify-satrt gap-2 mb-2">
          <NotificationButton
            label="전체"
            isSelected={selectedType === 'all'}
            onClick={() => handleTypeChange('all')}
          ></NotificationButton>
          <NotificationButton
            label="북마크"
            isSelected={selectedType === 'bookmark'}
            onClick={() => handleTypeChange('bookmark')}
          ></NotificationButton>
          <NotificationButton
            label="인용"
            isSelected={selectedType === 'quotation'}
            onClick={() => handleTypeChange('quotation')}
          ></NotificationButton>
        </div>
        <div className="">
          <div className="mb-2">
            <SingleNotification
              theme={theme}
              isRead={false}
              type="bookmark"
              noteTitle="비타오백"
              userNickname="리락쿠마"
              date={new Date('2023-10-06 06:32:30.619203')}
              targetNoteId={2}
            />
          </div>
          <SingleNotification
            theme={theme}
            isRead={false}
            type="quotation"
            noteTitle="비타오백"
            userNickname="리락쿠마"
            date={new Date('2023-10-06 06:32:30.619203')}
            targetNoteId={2}
          />
        </div>
      </div>
    </ModalLayout>
  );
}

const THEME_VARIANTS = {
  light: 'bg-modal',
  dark: 'bg-dark-background-page text-white',
};
