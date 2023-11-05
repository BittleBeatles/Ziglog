import { ApiSuccessResponse } from '@api/types';
import { privateFetch } from '..';
import { API_URL } from '@api/constants';
import { Note } from './types';

export type AddBookmarkApiResponse = ApiSuccessResponse<null>;
export type GetBookmarkResponse = ApiSuccessResponse<{ notes: Note[] }>;

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

export async function getBookmark(): Promise<{ notes: Note[] }> {
  try {
    const res = await privateFetch<GetBookmarkResponse>(`${API_URL}/bookmark`, {
      method: 'GET',
    });
    return res.body.data;
  } catch (err) {
    throw err;
  }
}