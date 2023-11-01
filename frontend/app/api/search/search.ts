import { publicFetch } from '..';
import { API_URL } from '@api/constants';
import { SearchInfo } from './types';
import { ApiSuccessResponse } from '@api/types';

export type SearchApiData = ApiSuccessResponse<SearchInfo>;

export function getSearchInfo(
  debouncedKeyword: string,
  page: number,
  perPage: number
): Promise<SearchInfo> {
  console.log('요청 보냄');
  return publicFetch<SearchApiData>(
    `${API_URL}/search?keyword=${debouncedKeyword}&page=${page}&perPage=${perPage}`,
    {
      method: 'GET',
    }
  )
    .then((res) => {
      console.log('요청 받음');
      console.log('API 응답 데이터:', res);
      console.log('API 응답 데이터:', res.body.data);
      return Promise.resolve(res.body.data);
    })
    .catch((err) => {
      throw err;
    });
}
