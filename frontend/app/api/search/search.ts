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
  return publicFetch<SearchApiData>(
<<<<<<< HEAD
    `${API_URL}/search?keyword=${debouncedKeyword}`,
=======
    `${API_URL}/search?keyword=${debouncedKeyword}&page=${page}&perPage=${perPage}`,
>>>>>>> 8ecca5a (feat: 글 검색 결과 무한 스크롤 구현)
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
