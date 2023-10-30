import { returnFetchJson } from './setting';
import { store } from '@store/store';
import { ReissueToken } from './user/user';
import { API_URL } from './constants';

export const publicFetch = returnFetchJson({
  baseUrl: API_URL,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    'Content-type': 'application/json',
  },
});

export const privateFetch = returnFetchJson({
  baseUrl: API_URL,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    'Content-type': 'application/json',
  },
  interceptors: {
    request: async (config) => {
      const accessToken = store.getState().userReducer.accessToken;
      const grantType = store.getState().userReducer.grantType;
      config[1] = {
        headers: { Authorization: `${grantType} ${accessToken}` },
      };
      return config;
    },
    response: async (response, config, fetch) => {
      console.log('response', response);

      if (response.status === 401) {
        const newAccessToken = await ReissueToken();

        if (newAccessToken) {
          // 헤더를 업데이트합니다.
          config[1] = {
            headers: {
              Authorization: `${newAccessToken.grantType} ${newAccessToken.accessToken}`,
            },
          };
          return fetch(...config); // 수정된 설정으로 요청을 다시 시도합니다.
        } else {
          throw new Error('Failed to reissue token');
        }
      }

      return response;
    },
  },
});
