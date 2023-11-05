import { privateFetch } from '..';
import { TodoApiResponse } from './type';

export function getTodo() {
  privateFetch<TodoApiResponse>('todos/1', { method: 'GET' })
    .then((response) => {
      console.log(response.body);
    })
    .catch((error) => {
      console.error('API 요청에서 오류가 발생했습니다:', error);
    });
}
