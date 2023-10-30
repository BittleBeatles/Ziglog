import { publicFetch } from '..';
import { API_URL } from '@api/constants';
import { SearchInfo } from './types';
import { ApiSuccessResponse } from '@api/types';

export type SearchApiData = ApiSuccessResponse<SearchInfo>;

export function getSearchInfo(debouncedKeyword: string): Promise<SearchInfo> {
  return publicFetch<SearchApiData>(
    `${API_URL}/search?keyword=${debouncedKeyword}`,
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
