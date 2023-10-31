import { privateFetch } from '..';
import { API_URL } from '@api/constants';
import { EditNoteParams, NotePublicStatus } from './types';
import { ApiSuccessResponse } from '@api/types';

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
    return await Promise.resolve('[note edit succeeded]');
  } catch (err) {
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
    return await Promise.resolve(res.body.data);
  } catch (error) {
    throw error;
  }
}
