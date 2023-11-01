import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { TokenInfo, MyInfo, UserInfo, LogoutInfo } from './types';
import { store } from '@store/store';
import { setUserToken, logOut } from '@store/modules/userSlice';
import { ApiSuccessResponse } from '@api/types';

export type MyApiData = ApiSuccessResponse<MyInfo>;
export type UserApiData = ApiSuccessResponse<UserInfo>;
export type ReissueTokenApiData = ApiSuccessResponse<TokenInfo>;
export type LogoutApiData = ApiSuccessResponse<LogoutInfo>;
export type ModifyUserApiData = ApiSuccessResponse<UserInfo>;

export async function getMyInfo(): Promise<MyInfo> {
  try {
    const res = await privateFetch<MyApiData>(`${API_URL}/user/info`, {
      method: 'GET',
    });
    return res.body.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserInfo(nickname: string): Promise<UserInfo> {
  try {
    const res = await publicFetch<UserApiData>(`${API_URL}/user/${nickname}`, {
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

export function modifyUserInfo(
  nickname: string,
  profileUrl: string
): Promise<string | void> {
  return privateFetch<ModifyUserApiData>(`${API_URL}/user/modify`, {
    method: 'PUT',
    body: { nickname, profileUrl },
  })
    .then((res) => {
      return Promise.resolve('[note edit succeeded]');
    })
    .catch((err) => {
      throw err;
    });
}
