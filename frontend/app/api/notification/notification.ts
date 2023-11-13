import { ApiSuccessResponse } from '@api/types';
import { NotificationList } from './types';
import { privateFetch } from '..';
import { showAlert } from '@src/util/alert';
import { API_URL } from '@api/constants';

export type NotificationApiData = ApiSuccessResponse<NotificationList>;
export type NotificationReadApi = ApiSuccessResponse<[]>;

export function getNotificationList(): Promise<NotificationList> {
  return privateFetch<NotificationApiData>(`${API_URL}/notification`, {
    method: 'GET',
  })
    .then((res) => {
      if (res.body.statusCode === 200) {
        return Promise.resolve(res.body.data);
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
        return Promise.resolve(res.body.data);
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    });
}

export function putNotification(): Promise<[]> {
  notificationId: Number;
  return privateFetch<NotificationReadApi>(
    `${API_URL}/notification/read/${notificationId}`,
    {
      method: 'PUT',
    }
  )
    .then((res) => {
      if (res.body.statusCode === 200) {
        return Promise.resolve(res.body.data);
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
        return Promise.resolve(res.body.data);
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    });
}
