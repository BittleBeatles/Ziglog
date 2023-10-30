import { privateFetch } from '..';
import { API_URL } from '@api/constants';
import { UserInfo } from './types';
import { useAppDispatch } from '@store/store';
import { setAccessToken } from '@store/modules/userSlice';
import { ApiSuccessResponse } from '@api/types';

export type UserApiData = ApiSuccessResponse<UserInfo>;
export function getUserInfo(): Promise<UserInfo> {
  return privateFetch<UserApiData>(`${API_URL}/user/info`, {
    method: 'GET',
  })
    .then((res) => {
      return res.body.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function ReissueToken() {
  const dispatch = useAppDispatch();
  return privateFetch(`${API_URL}/auth/refresh`, {
    method: 'GET',
  })
    .then((res) => {
      dispatch(setAccessToken('newAccessToken'));
    })
    .catch((err) => {
      if (!err.response.body || !err.config) {
        console.log('[token reissue]:Unknown error');
      }
      return Promise.reject(err);
    });
}
