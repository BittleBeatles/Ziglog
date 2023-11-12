import { privateFetch } from '..';
import { API_URL } from '@api/constants';
import { EditNoteParams, NotePublicStatus } from './types';
import { ApiSuccessResponse } from '@api/types';
import { showAlert } from '@src/util/alert';

export type EditNoteApiResponse = ApiSuccessResponse<null>;
export type PublicStatusApiResponse = ApiSuccessResponse<NotePublicStatus>;

export async function sendEditNoteInfoRequest(
  noteId: number,
  body: EditNoteParams
): Promise<string | void> {
  try {
    const res = await privateFetch<EditNoteApiResponse>(
      `${API_URL}/note/${noteId}`,
      {
        method: 'PUT',
        body: body,
      }
    );
    if (res.body.statusCode === 200) {
      return await Promise.resolve('[note edit succeeded]');
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
    }
  } catch (err) {
    showAlert('예상치 못한 오류가 발생했습니다', 'error');
    throw err;
  }
}

export async function changeNotePublicStatusRequest(
  noteId: number,
  body: NotePublicStatus
): Promise<NotePublicStatus> {
  try {
    const res = await privateFetch<PublicStatusApiResponse>(
      `${API_URL}/note/${noteId}/public`,
      {
        method: 'PUT',
        body: body,
      }
    );
    if (res.body.statusCode === 200) {
      return await Promise.resolve(res.body.data);
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      return await Promise.resolve(res.body.data);
    }
  } catch (error) {
    showAlert('예상치 못한 오류가 발생했습니다', 'error');
    throw error;
  }
}
