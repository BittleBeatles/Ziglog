import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { NoteInfo, EditNoteInfo } from './types';
import { ApiSuccessResponse } from '@api/types';

export type NoteApiData = ApiSuccessResponse<NoteInfo>;
export type EditNoteApiResponse = ApiSuccessResponse<null>;
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
  params: EditNoteInfo
): Promise<string | void> {
  return privateFetch<EditNoteApiResponse>(`${API_URL}/note/${noteId}`, {
    method: 'PUT',
    body: params,
  })
    .then((res) => {
      return Promise.resolve('[note edit succeeded]');
    })
    .catch((err) => {
      throw err;
    });
}
