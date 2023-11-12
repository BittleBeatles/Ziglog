import { ApiSuccessResponse } from '@api/types';
import { privateFetch } from '..';
import { API_URL } from '@api/constants';
import { Note, IsBookmarked } from './types';
import { showAlert } from '@src/util/alert';

export type AddBookmarkApiResponse = ApiSuccessResponse<null>;
export type GetBookmarkResponse = ApiSuccessResponse<{ notes: Note[] }>;
export type IsBookmarkedApiRespone = ApiSuccessResponse<IsBookmarked>;

export async function addBookmark(noteId: number) {
  return privateFetch<AddBookmarkApiResponse>(`${API_URL}/bookmark`, {
    method: 'POST',
    body: { noteId },
  })
    .then((res) => {
      if (res.body.statusCode === 200) {
        return res.body;
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    });
}

export async function deleteBookmark(noteId: number) {
  return privateFetch<AddBookmarkApiResponse>(`${API_URL}/bookmark/${noteId}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (res.body.statusCode === 200) {
        return res.body;
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    });
}

export async function getBookmark(): Promise<{ notes: Note[] }> {
  try {
    const res = await privateFetch<GetBookmarkResponse>(`${API_URL}/bookmark`, {
      method: 'GET',
    });
    if (res.body.statusCode === 200) {
      return res.body.data;
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      return res.body.data;
    }
  } catch (err) {
    showAlert('예상치 못한 오류가 발생했습니다', 'error');
    throw err;
  }
}

export async function isNoteBookmarked(noteId: number): Promise<IsBookmarked> {
  try {
    const res = await privateFetch<IsBookmarkedApiRespone>(
      `${API_URL}/bookmark/${noteId}`,
      {
        method: 'GET',
      }
    );
    if (res.body.statusCode === 200) {
      return res.body.data;
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      return res.body.data;
    }
  } catch (error) {
    showAlert('예상치 못한 오류가 발생했습니다', 'error');
    throw error;
  }
}
