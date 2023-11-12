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
    if (res.body.statusCode === 200) {
      return res.body.data;
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      return res.body.data;
    }
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
    if (res.body.statusCode === 200) {
      return res.body.data;
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      return res.body.data;
    }
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
    window.location.reload();
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
      if (res.body.statusCode === 200) {
        store.dispatch(setUserToken({ ...res.body.data, grantType: 'Bearer' }));
        return res.body.data;
      } else {
        showAlert('사용자 인증에 실패했습니다', 'error');
      }
    })
    .catch((err) => {
      if (!err.response.body || !err.config) {
        showAlert('사용자 인증에 실패했습니다', 'error');
      }
      return Promise.reject(err);
    });
}

export async function checkNickname(
  newNickname: string
): Promise<NicknameInfo> {
  return privateFetch<NicknameApiData>(`${API_URL}/user/check/nickname`, {
    method: 'POST',
    body: { nickname: newNickname },
  }).then((res) => {
    if (res.body.statusCode === 200) {
      return res.body.data;
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      return res.body.data;
    }
  });
}

export async function modifyUserInfo(
  nickname: string,
  profileUrl: string
): Promise<string | void> {
  try {
    const res = privateFetch<UserApiData>(
      `${API_URL}/user/modify?nickname=${nickname}&profileUrl=${profileUrl}`,
      {
        method: 'PUT',
        body: { nickname, profileUrl },
      }
    );
    if ((await res).body.statusCode === 200) {
      return await Promise.resolve('[user info modified]');
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
    }
  } catch (err) {
    showAlert('예상치 못한 오류가 발생했습니다', 'error');
    throw err;
  }
}
