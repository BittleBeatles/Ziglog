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

export async function createNote(folderId: number) {
  return privateFetch<CreateNoteApiResponse>(`${API_URL}/note`, {
    method: 'POST',
    body: { folderId },
  })
    .then((res) => {
      return console.log(`${folderId}에 노트가 생성되었습니다.`);
    })
    .catch((err) => {
      return console.log(err);
    });
}

export async function getReferenceList(noteId: number) {
  return publicFetch<QuotationListApiResponse>(`${API_URL}/note/ref`, {
    method: 'GET',
    body: { noteId },
  })
    .then((res) => {
      return res.body.data;
    })
    .catch((err) => {
      throw err;
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
