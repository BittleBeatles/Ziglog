import { ApiSuccessResponse } from '@api/types';
import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { DirectoryItem, FolderListResponse } from './types';

export type CreateFolderApiResponse = ApiSuccessResponse<null>;
export type SideBarListResponse = ApiSuccessResponse<FolderListResponse>;
export type DeleteFolderApiResponse = ApiSuccessResponse<null>;

export async function createFolder(parentId: number, title: string) {
  return privateFetch<CreateFolderApiResponse>(`${API_URL}/folder`, {
    method: 'POST',
    body: { parentId: parentId, folderName: title },
  })
    .then((res) => {
      return console.log(`${parentId}에 폴더가 생성되었습니다.`);
    })
    .catch((err) => {
      throw err;
    });
}

export async function getFolderList(
  nickname: string
): Promise<DirectoryItem[]> {
  try {
    const res = await publicFetch<SideBarListResponse>(
      `${API_URL}/note?nickname=${nickname}`,
      {
        method: 'GET',
      }
    );
    console.log(res.body.data.folderList);
    return res.body.data.folderList;
  } catch (err) {
    throw err;
  }
}

export async function deleteFolder(folderId: number) {
  return privateFetch<CreateFolderApiResponse>(`${API_URL}/folder`, {
    method: 'DELETE',
  })
    .then((res) => {
      console.log(res);
      return console.log(`${folderId}번째 폴더가 삭제되었습니다`);
    })
    .catch((err) => {
      throw err;
    });
}
