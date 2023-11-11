import { API_URL } from '@api/constants';
import { publicFetch } from '..';
import { ApiSuccessResponse } from '../types';
import { GraphData, NoteGraphData } from './types';

// 폴더 그래프 요청
export type GraphApiResponse = ApiSuccessResponse<GraphData>;

export async function getGraph(nickname: string) {
  return publicFetch<GraphApiResponse>(
    `${API_URL}/graph/folder?nickname=${nickname}`,
    {
      method: 'GET',
    }
  )
    .then((res) => {
      return res.body.data;
    })
    .catch((err) => {
      throw err;
    });
}

// 노트 그래프 요청
export type NoteGraphApiResponse = ApiSuccessResponse<NoteGraphData>;

export async function getNoteGraph(nickname: string) {
  return publicFetch<NoteGraphApiResponse>(
    `${API_URL}/graph/note?nickname=${nickname}`,
    {
      method: 'GET',
    }
  )
    .then((res) => {
      return res.body.data;
    })
    .catch((err) => {
      throw err;
    });
}
