import { returnFetchJson } from './setting';

const API_URL = 'https://jsonplaceholder.typicode.com/';
// fetch 기본 설정 이에요 ex) baseUrl, interceptor 추가가능
export const publicFetch = returnFetchJson({
  baseUrl: API_URL,
});

export const privateFetch = returnFetchJson({
  baseUrl: API_URL,
  interceptors: {},
});
