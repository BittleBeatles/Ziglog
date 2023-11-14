import { API_URL } from '@api/constants';
import { store } from '@store/store';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { SseNotification } from './types';

export async function subscribe(
  onNotification: (notification: SseNotification) => void
) {
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
      }
    );

    eventSource.addEventListener('message', (event) => {
      const notification: SseNotification = JSON.parse(event.data);
      console.log('sse:', notification);
      onNotification(notification);
    });
  } catch (error) {
    throw error;
  }
}
