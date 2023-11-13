import { ApiSuccessResponse } from '@api/types';
import { NotificationList } from './types';
import { store } from '@store/store';
import { publicFetch } from '..';
import { showAlert } from '@src/util/alert';
import { API_URL } from '@api/constants';

export type NotificationApiData = ApiSuccessResponse<NotificationList>;

export function getNotificationList(): Promise<NotificationList> {
  const accessToken = store.getState().user.accessToken;
  const grantType = store.getState().user.grantType;
  return publicFetch<NotificationApiData>(`${API_URL}/notification`, {
    method: 'GET',
    headers: {
      Authorization: `${grantType} ${accessToken}`,
    },
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
