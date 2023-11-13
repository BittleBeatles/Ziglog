import ModalLayout from '@components/common/ModalLayout';
import Text from '@components/common/Text';
import NotificationButton from '@components/userPage/Notification/NotificationButton';
import SingleNotification from './SingleNotification';
import { useEffect, useState } from 'react';
import IconButton from '@components/common/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNotificationList,
  putNotification,
} from '@api/notification/notification';
import { RootState } from '@store/store';
import { NotificationList } from '@api/notification/types';

interface NotificationModalProps {
  theme: 'light' | 'dark';
  openModal: (open: boolean) => void;
}

export default function NotificationModal({
  theme,
  openModal,
}: NotificationModalProps) {
  const [selectedType, setSelectedType] = useState<
    'all' | 'bookmark' | 'quotation'
  >('all');
  const handleTypeChange = (newType: 'all' | 'bookmark' | 'quotation') => {
    setSelectedType(newType);
  };
  // RootState에서 알림 목록 가져오기
  const storedNotifications = useSelector(
    (state: RootState) => state.user.notifications.nontificationList
  );

  //알림 목록 조회
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState<NotificationList>({
    nontificationList: [],
  });
  // 알림 읽기 핸들러
  const handleNotificationRead = async (notificationId: number) => {
    try {
      await putNotification(notificationId);
      // 여기에서 새로운 알림 목록을 가져옴.
      const updatedNotifications: NotificationList =
        await getNotificationList();
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  useEffect(() => {
    // 최초 마운트 시에 알림 목록을 가져옴
    const fetchData = async () => {
      try {
        // 알림 목록 조회
        const initialNotifications = await getNotificationList();
        setNotifications(initialNotifications);

        // SSE 연결 설정
        // subscribe();
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // storedNotifications가 변경될 때마다 업데이트
  useEffect(() => {
    setNotifications((prevState) => ({
      ...prevState,
      notificationList: storedNotifications,
    }));
  }, [storedNotifications]);

  return (
    <ModalLayout classname={`${THEME_VARIANTS[theme]} px-6 py-8`}>
      <div className="">
        <Text type="h4">{'알림'}</Text>
        <div className="absolute inset-y-5 right-5">
          <IconButton
            onClick={() => openModal(false)}
            theme={theme}
            name="Close"
          />
        </div>
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
          {notifications.nontificationList.map((notification) => (
            <div key={notification.id} className="mb-2">
              <SingleNotification
                theme={theme}
                // id={notification.id}
                senderNickname={notification.senderNickname}
                senderProfileUrl={notification.senderProfileUrl}
                noteId={notification.noteId}
                title={notification.title}
                isRead={notification.isRead}
                type={notification.type}
                dateTime={notification.dateTime}
                onClick={() => handleNotificationRead(notification.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </ModalLayout>
  );
}

const THEME_VARIANTS = {
  light: 'bg-modal',
  dark: 'bg-dark-background-layout text-white',
};
