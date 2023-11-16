import { ApiSuccessResponse } from '@api/types';
import { NotificationList } from './types';
import { privateFetch } from '..';
import { showAlert } from '@src/util/alert';
import { API_URL } from '@api/constants';

export type NotificationApiData = ApiSuccessResponse<NotificationList>;
export type NotificationReadApi = ApiSuccessResponse<[]>;

// 전체 알림 목록 조회
export async function getNotificationList(): Promise<NotificationList> {
  try {
    const res = await privateFetch<NotificationApiData>(
      `${API_URL}/notification`,
      {
        method: 'GET',
      }
    );
    if (res.body.statusCode === 200) {
      return await Promise.resolve(res.body.data);
    } else {
      showAlert(res.body.message, 'error');
      return res.body.data;
    }
  } catch (err) {
    showAlert('예상치 못한 오류가 발생했습니다', 'error');
    throw err;
  }
}

// 알림을 읽기 처리
export async function putNotification(notificationId: string): Promise<[]> {
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
        showAlert(res.body.message, 'error');
        return Promise.resolve(res.body.data);
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    });
}

// 해당 알림을 목록에서 삭제
export async function deleteNotification(notificationId: string) {
  return privateFetch<NotificationReadApi>(
    `${API_URL}/notification/delete/${notificationId}`,
    {
      method: 'DELETE',
    }
  )
    .then((res) => {
      console.log('삭제처리코드:', res.body.statusCode);
      if (res.body.statusCode === 200) {
        showAlert('알림이 성공적으로 삭제되었습니다', 'success');
        return;
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
      }
    })
    .catch((err) => {
      throw err;
    });
}
