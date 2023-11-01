import { ApiSuccessResponse } from '@api/types';
import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';

export type CreateFolderApiResponse = ApiSuccessResponse<null>;
export async function createFolder(parentId: number, title: string) {
  return privateFetch<CreateFolderApiResponse>(`${API_URL}/folder`, {
    method: 'POST',
    body: { parentId, folderName: title },
  })
    .then((res) => {
      return console.log(`${parentId}에 폴더가 생성되었습니다.`);
    })
    .catch((err) => {
      throw err;
    });
}