import { ApiSuccessResponse } from '@api/types';
import { privateFetch } from '..';
import { API_URL } from '@api/constants';

export type AddBookmarkApiResponse = ApiSuccessResponse<null>;

export async function addBookmark(noteId: number) {
  return privateFetch<AddBookmarkApiResponse>(`${API_URL}/bookmark`, {
    method: 'POST',
    body: { noteId },
  })
    .then((res) => {
      return console.log('북마크가 추가되었습니다.');
    })
    .catch((err) => {
      throw err;
    });
}

export async function deleteBookmark(noteId: number) {
  return privateFetch<AddBookmarkApiResponse>(`${API_URL}/bookmark/${noteId}`, {
    method: 'DELETE',
  })
    .then((res) => {
      return console.log('북마크가 삭제되었습니다.');
    })
    .catch((err) => {
      throw err;
    });
}
