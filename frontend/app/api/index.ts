import { returnFetchJson } from './setting';

const API_URL = '';
// fetch 기본 설정 이에요 ex) baseUrl, interceptor 추가가능
export const publicFetch = returnFetchJson({
  baseUrl: API_URL,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
  },
});

export const privateFetch = returnFetchJson({
  baseUrl: API_URL,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
    // 'Access-Control-Credentials': true,
  },
  interceptors: {},
});
