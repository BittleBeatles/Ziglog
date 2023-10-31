import { privateFetch } from '..';
import { API_URL } from '@api/constants';
import { TokenInfo, UserInfo, LogoutInfo } from './types';
import { useAppDispatch } from '@store/store';
import { setUserToken } from '@store/modules/userSlice';
import { ApiSuccessResponse } from '@api/types';

export type UserApiData = ApiSuccessResponse<UserInfo>;
export type ReissueTokenApiData = ApiSuccessResponse<TokenInfo>;
export type LogoutApiData = ApiSuccessResponse<LogoutInfo>;

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

export function logout(): Promise<LogoutInfo> {
  return privateFetch<LogoutApiData>(`${API_URL}/logout`, {
    method: 'POST',
  })
    .then((res) => {
      return res.body.message;
    })
    .catch((err) => {
      throw err;
    });
}

export async function ReissueToken() {
  const dispatch = useAppDispatch();
  return privateFetch<ReissueTokenApiData>(`${API_URL}/auth/refresh`, {
    method: 'GET',
  })
    .then((res) => {
      dispatch(setUserToken(res.body.data));
      return res.body.data;
    })
    .catch((err) => {
      if (!err.response.body || !err.config) {
        console.log('[token reissue]:Unknown error');
      }
      return Promise.reject(err);
    });
}
