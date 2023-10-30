import { publicFetch } from '..';
import { API_URL } from '@api/constants';
import { NoteInfo } from './types';
import { ApiSuccessResponse } from '@api/types';

export type NoteApiData = ApiSuccessResponse<NoteInfo>;

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
