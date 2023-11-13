import { ApiSuccessResponse } from '@api/types';
import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { DirectoryItem, FolderListResponse, JustFolderResponse } from './types';
import { showAlert } from '@src/util/alert';

export type CreateFolderApiResponse = ApiSuccessResponse<null>;
export type EditFolderApiResponse = ApiSuccessResponse<null>;
export type SideBarListResponse = ApiSuccessResponse<FolderListResponse>;
export type DeleteFolderApiResponse = ApiSuccessResponse<null>;
export type GetJustFolderApiResponse = ApiSuccessResponse<JustFolderResponse>;
export type ChangeFolderApiResponse = ApiSuccessResponse<null>;

export async function createFolder(parentId: number, title: string) {
  return privateFetch<CreateFolderApiResponse>(`${API_URL}/folder`, {
    method: 'POST',
    body: { parentId: parentId, folderName: title },
  })
    .then((res) => {
      if (res.body.statusCode === 200) {
        return;
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
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
    if (res.body.statusCode === 200) {
      return res.body.data.folderList;
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      return res.body.data.folderList;
    }
  } catch (err) {
    showAlert('예상치 못한 오류가 발생했습니다', 'error');
    throw err;
  }
}

export async function deleteFolder(folderId: number) {
  return privateFetch<CreateFolderApiResponse>(
    `${API_URL}/folder/${folderId}`,
    {
      method: 'DELETE',
    }
  )
    .then((res) => {
      if (res.body.statusCode === 200) {
        return;
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    });
}

export async function editFolder(folderId: number, folderName: string) {
  return privateFetch<EditFolderApiResponse>(`${API_URL}/folder`, {
    method: 'PUT',
    body: {
      folderId,
      folderName,
    },
  })
    .then((res) => {
      if (res.body.statusCode === 200) {
        return;
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    });
}

export async function getJustFolderList() {
  return privateFetch<GetJustFolderApiResponse>(`${API_URL}/folder`, {
    method: 'GET',
  })
    .then((res) => {
      if (res.body.statusCode === 200) {
        return res.body.data.folderList;
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      throw err;
    });
}

export async function changeFolderList(parentId: number, childId: number) {
  return privateFetch<ChangeFolderApiResponse>(`${API_URL}/folder/parent`, {
    method: 'PUT',
    body: {
      parentId,
      childId,
    },
  })
    .then((res) => {
      if (res.body.statusCode === 200) {
        return;
      } else {
        showAlert('예상치 못한 오류가 발생했습니다', 'error');
      }
    })
    .catch((err) => {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
    });
}
