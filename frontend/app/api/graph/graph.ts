import { API_URL } from '@api/constants';
import { publicFetch } from '..';
import { ApiSuccessResponse } from '../types';
import { GraphData } from './types';

export type GraphApiResponse = ApiSuccessResponse<GraphData>;

export async function getGraph(nickname: string) {
  return publicFetch<GraphApiResponse>(
    `${API_URL}/graph?nickname=${nickname}`,
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
