import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { ApiSuccessResponse } from '@api/types';
import { quotingQuotedNotes, quotingNoteIdsList } from './types';

export type QuoteApiData = ApiSuccessResponse<quotingQuotedNotes>;
export type QuotingNoteIdsApiData = ApiSuccessResponse<quotingNoteIdsList>;

// 내가 참조하는 / 참조받는 목록 get 요청
export async function getQuoteData(
  noteId: number
): Promise<quotingQuotedNotes> {
  try {
    const res = await publicFetch<QuoteApiData>(
      `${API_URL}/quote/list/${noteId}`,
      {
        method: 'GET',
      }
    );
    return await Promise.resolve(res.body.data);
  } catch (error) {
    throw error;
  }
}

// 내가 참조하는 노트 ID 목록 get 요청
export async function getQuotingNoteIdData(
  noteId: number
): Promise<quotingNoteIdsList> {
  try {
    const res = await privateFetch<QuotingNoteIdsApiData>(
      `${API_URL}/quote/quoting/${noteId}`,
      {
        method: 'GET',
      }
    );
    return Promise.resolve(res.body.data);
  } catch (error) {
    throw error;
  }
}

// 내가 참조하는 노트 ID 목록 put 요청
export async function putQuotingNoteIdData(
  noteId: number,
  body: number[]
): Promise<quotingNoteIdsList> {
  try {
    const res = await privateFetch<QuotingNoteIdsApiData>(
      `${API_URL}/quote/quoting/${noteId}`,
      {
        method: 'PUT',
        body: { quotingNoteIds: body },
      }
    );
    return Promise.resolve(res.body.data);
  } catch (error) {
    throw error;
  }
}
