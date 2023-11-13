import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { NoteInfo, NoteRefListInfo } from './types';
import { ApiSuccessResponse } from '@api/types';
import { showAlert } from '@src/util/alert';
export type NoteApiData = ApiSuccessResponse<NoteInfo>;
export type CreateNoteApiResponse = ApiSuccessResponse<null>;
export type QuotationListApiResponse = ApiSuccessResponse<NoteRefListInfo>;
export type ChangeNoteRouteApiResponse = ApiSuccessResponse<null>;

export async function getNoteInfo(
  noteId: number,
  isLogin: boolean
): Promise<NoteApiData> {
  if (isLogin) {
    try {
      const res = await privateFetch<NoteApiData>(`${API_URL}/note/${noteId}`, {
        method: 'GET',
      });
      if (res.body.statusCode === 200) {
        return await Promise.resolve(res.body);
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
        return await Promise.resolve(res.body);
      }
    } catch (err) {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    }
  } else {
    try {
      const res = await publicFetch<NoteApiData>(`${API_URL}/note/${noteId}`, {
        method: 'GET',
      });
      if (res.body.statusCode === 200) {
        return await Promise.resolve(res.body);
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
        return await Promise.resolve(res.body);
      }
    } catch (err) {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    }
  }
}

export async function createNote(folderId: number) {
  return privateFetch<CreateNoteApiResponse>(`${API_URL}/note`, {
    method: 'POST',
    body: { folderId },
  })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return;
    });
}

export async function deleteNote(noteId: number, nickname: string) {
  return privateFetch<CreateNoteApiResponse>(
    `${API_URL}/note?noteId=${noteId}`,
    {
      method: 'DELETE',
    }
  )
    .then((res) => {
      if (res.body.statusCode === 200) {
        showAlert('성공적으로 삭제되었습니다. ', 'success');
        return;
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
      }
    })
    .catch((err) => {
      throw err;
    });
}

export async function changeNoteRoute(parentId: number, childId: number) {
  return privateFetch<ChangeNoteRouteApiResponse>(`${API_URL}/note/parent`, {
    method: 'PUT',
    body: {
      parentId,
      childId,
    },
  })
    .then((res) => {
      if (res.body.statusCode === 200) {
        return;
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
    });
}
