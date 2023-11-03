import { privateFetch } from '..';
import { API_URL } from '@api/constants';
import { FolderNoteList } from './types';
import { ApiSuccessResponse } from '@api/types';

export type SideBarNoteList = ApiSuccessResponse<FolderNoteList>;

export async function getNote(nickname: string) {
  privateFetch<SideBarNoteList>(`${API_URL}/note`, {
    method: 'POST',
    body: { nickname },
  })
    .then((res) => {
      return res.body.data.folder;
    })
    .catch((err) => {
      throw err;
    });
}
