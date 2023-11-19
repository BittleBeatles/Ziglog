import ModalLayout from '@components/common/ModalLayout';
import Text from '@components/common/Text';
import NotificationButton from '@components/userPage/Notification/NotificationButton';
import SingleNotification from './SingleNotification';
import { useEffect, useState } from 'react';
import {
  getNotificationList,
  putNotification,
} from '@api/notification/notification';
import { NotificationList } from '@api/notification/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setNotifications } from '@store/modules/userSlice';

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

  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.user.notifications
  );

  //알림 목록 조회
  // const [notifications, setNotifications] = useState<NotificationList>({
  //   nontificationList: [],
  // });

  // 삭제된 알림 업데이트 함수
  const handleFilterList = (id: string) => {
    dispatch(
      setNotifications({
        nontificationList: notifications.nontificationList.filter(
          (notification) => notification.id !== id
        ),
      })
    );
  };
  // 알림 읽기 핸들러
  const handleNotificationRead = async (notificationId: string) => {
    try {
      // 알림을 읽기 처리
      await putNotification(notificationId);

      // 기존 알림 목록에서 해당 알림을 찾아 isRead 상태를 업데이트
      dispatch(
        setNotifications({
          nontificationList: notifications.nontificationList.map(
            (notification) =>
              notification.id === notificationId
                ? { ...notification, isRead: true }
                : notification
          ),
        })
      );
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
        dispatch(setNotifications(initialNotifications));
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // 버튼 필터 (북마크 / 인용)
  const filteredNotifications = (notifications.nontificationList || [])
    .filter((notification) => {
      if (selectedType === 'all') {
        return true;
      } else {
        return notification.type === selectedType;
      }
    })
    .sort((a, b) => {
      // isRead 속성을 숫자로 변환 후 뺄셈 연산
      const unreadComparison = Number(a.isRead) - Number(b.isRead);

      if (unreadComparison !== 0) {
        return unreadComparison;
      }

      // 읽은 상태가 같다면 dateTime으로 정렬
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
          />
          <NotificationButton
            label="북마크"
            isSelected={selectedType === 'BOOKMARK'}
            onClick={() => handleTypeChange('BOOKMARK')}
          />
          <NotificationButton
            label="참조"
            isSelected={selectedType === 'QUOTE'}
            onClick={() => handleTypeChange('QUOTE')}
          />
        </div>
        <div className="">
          {filteredNotifications.length > 0 ? (
            <div
              id="sidebar-scroll"
              className="max-h-100 overflow-y-auto scroll-bar"
            >
              {filteredNotifications.map((notification, index) => (
                <div key={`${notification.id}_${index}`} className="mb-2">
                  {notification.senderNickname !== undefined &&
                    notification.noteId !== undefined && (
                      <SingleNotification
                        theme={theme}
                        id={notification.id}
                        senderNickname={notification.senderNickname}
                        senderProfileUrl={notification.senderProfileUrl}
                        receiverNickname={notification.receiverNickname}
                        noteId={notification.noteId}
                        title={notification.title}
                        isRead={notification.isRead}
                        type={notification.type}
                        dateTime={notification.dateTime}
                        handleNotificationRead={handleNotificationRead}
                        handleFilterList={handleFilterList}
                        // onClick={() => handleNotificationRead(notification.id)}
                      />
                    )}
                </div>
              ))}
            </div>
          ) : (
            <div className="w-108 p-3 h-20">
              <p>알림이 없습니다.</p>
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
function dispatch(arg0: void) {
  throw new Error('Function not implemented.');
}
