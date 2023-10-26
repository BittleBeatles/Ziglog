import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { UserInfo } from './types';
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
