import { privateFetch } from '..';
import { API_URL } from '@api/constants';
import { UserInfo } from './types';
import { useAppDispatch } from '@store/store';
import { setAccessToken } from '@store/modules/userSlice';

// promise Type 수정해야함
export function getUserInfo(): Promise<UserInfo> {
  return privateFetch<UserInfo>(`${API_URL}/user/info`, {
    method: 'GET',
  })
    .then((response) => {
      return response.body;
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
      return Promise.resolve(res.body);
    })
    .catch((err) => {
      if (!err.response.body || !err.config) {
        console.log('[token reissue]:Unknown error');
      }
      return Promise.reject(err);
    });
}
