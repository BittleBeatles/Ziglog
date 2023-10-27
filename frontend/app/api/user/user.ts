import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { UserInfo } from './types';

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

export const reissueToken = (reissueToken: string) => {
  return privateFetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
  })
    .then((res) => {
      if (res.body) {
        const newAccessToken = res.body;
        let newHeaders = res.headers;
        newHeaders = {
          Authorization: `Bearer ${newAccessToken}`,
        };
      }
      return Promise.resolve(res.body);
    })
    .catch((err) => {
      if (!err.response.body || !err.config) {
        console.log('[token reissue]:Unknown error');
      }
      return Promise.reject(err);
    });
};
