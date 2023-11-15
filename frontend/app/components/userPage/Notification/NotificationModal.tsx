import ModalLayout from '@components/common/ModalLayout';
import Text from '@components/common/Text';
import NotificationButton from '@components/userPage/Notification/NotificationButton';
import SingleNotification from './SingleNotification';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNotificationList,
  putNotification,
} from '@api/notification/notification';
import { NotificationList } from '@api/notification/types';
import { subscribe } from '@api/notification/subscribe';

interface NotificationModalProps {
  theme: 'light' | 'dark';
  openModal: (open: boolean) => void;
}

export default function NotificationModal({
  theme,
  openModal,
}: NotificationModalProps) {
  const [selectedType, setSelectedType] = useState<
    'all' | 'BOOKMARK' | 'QUOTE'
  >('all');
  const handleTypeChange = (newType: 'all' | 'BOOKMARK' | 'QUOTE') => {
    setSelectedType(newType);
  };

  //알림 목록 조회
  const [notifications, setNotifications] = useState<NotificationList>({
    nontificationList: [],
  });
  // 알림 읽기 핸들러
  const handleNotificationRead = async (notificationId: string) => {
    try {
      await putNotification(notificationId);
      // 여기에서 새로운 알림 목록을 가져옴.(보류)
      const updatedNotifications: NotificationList =
        await getNotificationList();
      setNotifications(updatedNotifications);
      console.log('읽기 잘되니?:', updatedNotifications);
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
        console.log('알림 목록:', initialNotifications);
        setNotifications(initialNotifications);

        // SSE 연결 설정
        subscribe((newNotification) => {
          console.log('new', newNotification);
          // 새로운 알림이 도착하면 알림 목록 업데이트
          setNotifications((prevNotifications) => ({
            ...prevNotifications,
            nontificationList: [
              ...prevNotifications.nontificationList,
              newNotification,
            ],
          }));
        });
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData();
  }, []);

  // 버튼 필터 (북마크 / 인용)
  const filteredNotifications = (notifications?.nontificationList || [])
    .filter((notification) => {
      if (selectedType === 'all') {
        return true;
      } else {
        return notification.type === selectedType;
      }
    })
    .sort((a, b) => {
      // 최신 순으로 정렬 (기준은 dateTime)
      const dateA = new Date(a.dateTime).getTime();
      const dateB = new Date(b.dateTime).getTime();

      return dateB - dateA;
    });

  return (
    <ModalLayout classname={`${THEME_VARIANTS[theme]} px-6 py-8`}>
      <div className="max-h-120">
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
            isSelected={selectedType === 'BOOKMARK'}
            onClick={() => handleTypeChange('BOOKMARK')}
          ></NotificationButton>
          <NotificationButton
            label="인용"
            isSelected={selectedType === 'QUOTE'}
            onClick={() => handleTypeChange('QUOTE')}
          ></NotificationButton>
        </div>
        <div className="">
          {filteredNotifications.length === 0 ? (
            <div className="w-108 p-3 h-20">
              <p> 알림이 없습니다.</p>
            </div>
          ) : (
            <div
              id="sidebar-scroll"
              className="max-h-100 overflow-y-auto scroll-bar"
            >
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="mb-2">
                  <SingleNotification
                    theme={theme}
                    id={notification.id}
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
          )}
        </div>
      </div>
    </ModalLayout>
  );
}

const THEME_VARIANTS = {
  light: 'bg-modal',
  dark: 'bg-dark-background-layout text-white',
};
