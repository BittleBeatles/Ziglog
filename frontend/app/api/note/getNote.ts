import { privateFetch } from '..';
import { API_URL } from '@api/constants';
import { FolderNoteList } from './types';
import { ApiSuccessResponse } from '@api/types';
import { showAlert } from '@src/util/alert';

export type SideBarNoteList = ApiSuccessResponse<FolderNoteList>;

export async function getNote(nickname: string) {
  privateFetch<SideBarNoteList>(`${API_URL}/note`, {
    method: 'POST',
    body: { nickname },
  })
    .then((res) => {
      if (res.body.statusCode === 200) {
        return res.body.data.folder;
      } else {
        showAlert(res.body.message, 'error');
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    });
}
