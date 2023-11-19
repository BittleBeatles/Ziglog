// subscribe.ts
import { API_URL } from '@api/constants';
import { store } from '@store/store';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { NotificationList, NotificationResult, SseNotification } from './types';
import { setNotificationDot, setNotifications } from '@store/modules/userSlice';

export async function subscribe() {
  const connect = () => {
    try {
      const accessToken = store.getState().user.accessToken;
      const grantType = store.getState().user.grantType;

      const eventSource = new EventSourcePolyfill(
        `${API_URL}/notification/subscribe`,
        {
          headers: {
            Authorization: `${grantType} ${accessToken}`,
          },
          lastEventIdQueryParameterName: 'Last-Event-Id',
          heartbeatTimeout: 30 * 60 * 1000,
          withCredentials: true,
        }
      );

      eventSource.addEventListener('sse', (e) => {
        if (!(typeof JSON.parse((e as MessageEvent).data) === 'string')) {
          const sseData: SseNotification = JSON.parse((e as MessageEvent).data);

          console.log('sse데이터를 보자:', sseData);
          store.dispatch(setNotificationDot(true));

          // 새로운 알림
          const newNotification: NotificationResult = {
            id: sseData.id,
            senderNickname: sseData.senderNickname,
            senderProfileUrl: sseData.senderProfileUrl,
            receiverNickname: sseData.receiverNickname,
            noteId: sseData.noteId,
            title: sseData.title,
            isRead: sseData.isRead,
            type: sseData.type,
            dateTime: sseData.dateTime,
          };

          // 이전 알림 목록
          const prevNotifications: NotificationList =
            store.getState().user.notifications;
          console.log('prevNotifications:', prevNotifications);
          // 새로운 알림을 기존 알림 목록에 추가
          const updatedNotifications: NotificationList = {
            nontificationList: [
              ...prevNotifications.nontificationList,
              newNotification,
            ],
          };
          console.log('updatedNotifications:', updatedNotifications);
          // 알림 목록 업데이트
          store.dispatch(setNotifications(updatedNotifications));
        }
      });

      eventSource.addEventListener('error', (error) => {
        console.warn('EventSource error:', error);
        eventSource.close();

        // SSE 연결이 닫힐 때마다 재연결 시도
        console.log('SSE 연결이 닫혔습니다. 재연결 시도 중...');
        setTimeout(connect, 500);
      });
    } catch (error) {
      console.error('Subscription 도중 에러 발생:', error);
      setTimeout(connect, 500);
      throw error;
    }
  };

  // 초기 연결 시도
  connect();
}
