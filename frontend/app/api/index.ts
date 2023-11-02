import { returnFetchJson } from './setting';
import { store, useAppDispatch } from '@store/store';
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
    Authorization: `${store.getState().user.grantType} ${
      store.getState().user.accessToken
    }`,
  },
  interceptors: {
    response: async (response, config, fetch) => {
      console.log('response', response);
      if (response.status === 401) {
        const newAccessToken = await ReissueToken();
        if (newAccessToken) {
          config[1] = {
            ...config[1],
            headers: {
              ...config[1]?.headers,
              Authorization: `${newAccessToken.grantType} ${newAccessToken.accessToken}`,
            },
          };
          return fetch(...config);
        } else {
          throw new Error('Failed to reissue token');
        }
      }
      return response;
    },
  },
});
