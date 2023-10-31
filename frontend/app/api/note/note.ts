import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { NoteInfo, EditNoteParams } from './types';
import { ApiSuccessResponse } from '@api/types';

export type NoteApiData = ApiSuccessResponse<NoteInfo>;
export type EditNoteApiResponse = ApiSuccessResponse<null>;
export type CreateNoteApiResponse = ApiSuccessResponse<null>;
export function getNoteInfo(noteId: number): Promise<NoteInfo> {
  return publicFetch<NoteApiData>(`${API_URL}/note/${noteId}`, {
    method: 'GET',
  })
    .then((res) => {
      return Promise.resolve(res.body.data);
    })
    .catch((err) => {
      throw err;
    });
}

export function sendEditNoteInfoRequest(
  noteId: number,
  body: EditNoteParams
): Promise<string | void> {
  return privateFetch<EditNoteApiResponse>(`${API_URL}/note/${noteId}`, {
    method: 'PUT',
    body: body,
  })
    .then((res) => {
      return Promise.resolve('[note edit succeeded]');
    })
    .catch((err) => {
      throw err;
    });
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
