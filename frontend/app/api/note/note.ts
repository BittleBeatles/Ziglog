import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { NoteInfo, NoteRefListInfo } from './types';
import { ApiSuccessResponse } from '@api/types';

export type NoteApiData = ApiSuccessResponse<NoteInfo>;
export type CreateNoteApiResponse = ApiSuccessResponse<null>;
export type QuotationListApiResponse = ApiSuccessResponse<NoteRefListInfo>;

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

export async function getReferenceList(
  noteId: number
): Promise<NoteRefListInfo> {
  try {
    const res = await publicFetch<QuotationListApiResponse>(
      `${API_URL}/note/ref?noteId=${noteId}`,
      {
        method: 'GET',
      }
    );
    return await Promise.resolve(res.body.data);
  } catch (error) {
    throw error;
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
      return console.log(err);
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
      window.location.replace(`/user-page/${nickname}`);
      return console.log(`${noteId}번 노트가 삭제되었습니다.`);
    })
    .catch((err) => {
      throw err;
    });
}
