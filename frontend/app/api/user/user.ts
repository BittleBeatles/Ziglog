import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { TokenInfo, MyInfo, UserInfo, LogoutInfo, NicknameInfo } from './types';
import { store } from '@store/store';
import { setUserToken, logOut } from '@store/modules/userSlice';
import { ApiSuccessResponse } from '@api/types';
import { showAlert } from '@src/util/alert';

export type MyApiData = ApiSuccessResponse<MyInfo>;
export type UserApiData = ApiSuccessResponse<UserInfo>;
export type ReissueTokenApiData = ApiSuccessResponse<TokenInfo>;
export type LogoutApiData = ApiSuccessResponse<LogoutInfo>;
export type ModifyUserApiData = ApiSuccessResponse<UserInfo>;
export type NicknameApiData = ApiSuccessResponse<NicknameInfo>;

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

// 닉네임으로 공개 정보를 조회
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
    window.location.replace('/');
    showAlert('로그아웃 되었습니다', 'success');
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
      store.dispatch(setUserToken({ ...res.body.data, grantType: 'Bearer' }));
      // console.log('[received new accessToken from reissue request]');
      return res.body.data;
    })
    .catch((err) => {
      if (!err.response.body || !err.config) {
        console.log('[token reissue]:Unknown error');
      }
      return Promise.reject(err);
    });
}

export async function checkNickname(newNickname: string): Promise<boolean> {
  return privateFetch<NicknameApiData>(
    `${API_URL}/user/check/nickname?nickname=${newNickname}`,
    {
      method: 'POST',
    }
  ).then((res) => {
    console.log(res);
    return true;
  });
}
