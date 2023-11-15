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
      console.log(e.data);
      const sseData: SseNotification = JSON.parse(e.data);
      callback(sseData);
      console.log('sse데이터를 보자:', sseData);
    });
  } catch (error) {
    throw error;
  }
}
