import { API_URL } from '@api/constants';
import { store } from '@store/store';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { NotificationEvent, NotificationData } from './types';

const accessToken = store.getState().user.accessToken;
const grantType = store.getState().user.grantType;

export async function subscribe() {
  try {
    const eventSource = new EventSourcePolyfill(
      `${API_URL}/notification/subscribe`,
      {
        headers: {
          Authorization: `${grantType} ${accessToken}`,
        },
        lastEventIdQueryParameterName: 'Last-Event-Id',
      }
    );

    eventSource.addEventListener('sse', {
      handleEvent: (e: NotificationEvent) => {
        const eventData = JSON.parse(JSON.parse(e.data)) as NotificationData;
        console.log(eventData);
      },
    });
  } catch (error) {
    throw error;
  }
}
