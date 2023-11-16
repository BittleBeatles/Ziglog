import { API_URL } from '@api/constants';
import { store } from '@store/store';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { SseNotification } from './types';

export async function subscribe(callback: (data: SseNotification) => void) {
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
      }
    );

    eventSource.addEventListener('sse', (e) => {
      // 'Event stream created' 넘기지 않기
      if (!(typeof JSON.parse((e as MessageEvent).data) === 'string')) {
        const sseData: SseNotification = JSON.parse((e as MessageEvent).data);
        callback(sseData);
        console.log('sse데이터를 보자:', sseData);
      }
    });
    eventSource.addEventListener('error', (error) => {
      console.warn('EventSource error:', error);
    });
  } catch (error) {
    console.error('Error during subscription:', error);
    throw error;
  }
}
