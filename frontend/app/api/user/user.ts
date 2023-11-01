import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { TokenInfo, UserInfo, LogoutInfo } from './types';
import { store, useAppDispatch } from '@store/store';
import { setUserToken, logOut } from '@store/modules/userSlice';
import { ApiSuccessResponse } from '@api/types';
import { redirect } from 'next/navigation';

export type UserApiData = ApiSuccessResponse<UserInfo>;
export type ReissueTokenApiData = ApiSuccessResponse<TokenInfo>;
export type LogoutApiData = ApiSuccessResponse<LogoutInfo>;

export async function getUserInfo(): Promise<UserInfo> {
  try {
    const res = await privateFetch<UserApiData>(`${API_URL}/user/info`, {
      method: 'GET',
    });
    return res.body.data;
  } catch (error) {
    throw error;
  }
}

export async function Logout(): Promise<LogoutInfo> {
  try {
    privateFetch<LogoutApiData>(`${API_URL}/logout`, {
      method: 'POST',
    });

    store.dispatch(logOut());
    // window.location.replace('/');
    return 'Logout 성공';
  } catch (err) {
    throw err;
  }
}

export async function ReissueToken() {
  return publicFetch<ReissueTokenApiData>(`${API_URL}/auth/refresh`, {
    method: 'GET',
  })
    .then((res) => {
      store.dispatch(setUserToken(res.body.data));
      console.log(
        '[received new accessToken from reissue request]',
        res.body.data
      );
      return res.body.data;
    })
    .catch((err) => {
      if (!err.response.body || !err.config) {
        console.log('[token reissue]:Unknown error');
      }
      return Promise.reject(err);
    });
}
