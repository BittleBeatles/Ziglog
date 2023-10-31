import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { NoteInfo, EditNoteParams, NotePublicStatus } from './types';
import { ApiSuccessResponse } from '@api/types';

export type NoteApiData = ApiSuccessResponse<NoteInfo>;
export type EditNoteApiResponse = ApiSuccessResponse<null>;
export type PublicStatusApiResponse = ApiSuccessResponse<NotePublicStatus>;
export type CreateNoteApiResponse = ApiSuccessResponse<null>;

export async function getNoteInfo(noteId: number): Promise<NoteInfo> {
  try {
    const res = await publicFetch<NoteApiData>(`${API_URL}/note/${noteId}`, {
      method: 'GET',
    });
    return await Promise.resolve(res.body.data);
  } catch (err) {
    throw err;
  }
}

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

export async function createNote(folderId: number, title: string) {
  return privateFetch<CreateNoteApiResponse>(`${API_URL}/note`, {
    method: 'POST',
    body: { folderId, title },
  })
    .then((res) => {
      return console.log(`${folderId}에 노트가 생성되었습니다.`);
    })
    .catch((err) => {
      throw err;
    });
}
