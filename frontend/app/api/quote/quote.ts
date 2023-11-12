import { privateFetch, publicFetch } from '..';
import { API_URL } from '@api/constants';
import { ApiSuccessResponse } from '@api/types';
import { quotingQuotedNotes, quotingNoteIdsList } from './types';
import { showAlert } from '@src/util/alert';

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
    if (res.body.statusCode === 200) {
      return await Promise.resolve(res.body.data);
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      return await Promise.resolve(res.body.data);
    }
  } catch (error) {
    showAlert('예상치 못한 오류가 발생했습니다', 'error');
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
    if (res.body.statusCode === 200) {
      return await Promise.resolve(res.body.data);
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      return await Promise.resolve(res.body.data);
    }
  } catch (error) {
    showAlert('예상치 못한 오류가 발생했습니다', 'error');
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
    if (res.body.statusCode === 200) {
      return await Promise.resolve(res.body.data);
    } else {
      showAlert('예상치 못한 오류가 발생했습니다', 'error');
      return await Promise.resolve(res.body.data);
    }
  } catch (error) {
    showAlert('예상치 못한 오류가 발생했습니다', 'error');
    throw error;
  }
}
