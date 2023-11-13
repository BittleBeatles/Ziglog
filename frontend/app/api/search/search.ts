import { publicFetch } from '..';
import { API_URL } from '@api/constants';
import { SearchInfo } from './types';
import { ApiSuccessResponse } from '@api/types';
import { showAlert } from '@src/util/alert';

export type SearchApiData = ApiSuccessResponse<SearchInfo>;

export function getSearchInfo(
  debouncedKeyword: string,
  page: number,
  perPage: number
): Promise<SearchInfo> {
  return publicFetch<SearchApiData>(
    `${API_URL}/search?keyword=${debouncedKeyword}&page=${page}&perPage=${perPage}`,
    {
      method: 'GET',
    }
  )
    .then((res) => {
      if (res.body.statusCode === 200) {
        return Promise.resolve(res.body.data);
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
        return Promise.resolve(res.body.data);
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    });
}

export function getPersonalSearchInfo(
  keyword: string,
  nickname: string,
  page: number,
  perPage: number
): Promise<SearchInfo> {
  return publicFetch<SearchApiData>(
    `${API_URL}/search?keyword=${keyword}&nickname=${nickname}&page=${page}&perPage=${perPage}`,
    {
      method: 'GET',
    }
  )
    .then((res) => {
      return Promise.resolve(res.body.data);
    })
    .catch((err) => {
      throw err;
    });
}
