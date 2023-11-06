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
  interceptors: {
    request: async (config) => {
      const accessToken = store.getState().user.accessToken;
      const grantType = store.getState().user.grantType;
      config[1] = {
        ...config[1],
        headers: {
          ...config[1]?.headers,
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods':
            'GET, PUT, POST, DELETE, PATCH, OPTIONS',
          'Content-type': 'application/json',
          Authorization: `${grantType} ${accessToken}`,
        },
      };
      return config;
    },
    response: async (response, config, fetch) => {
      let retryCounter = 0;
      if (response.status !== 401) {
        const newAccessToken = await ReissueToken();
        retryCounter++;
        if (newAccessToken && retryCounter < 3) {
          config[1] = {
            ...config[1],
            headers: {
              ...config[1]?.headers,
              'Access-Control-Allow-Origin': 'http://localhost:3000',
              'Access-Control-Allow-Methods':
                'GET, PUT, POST, DELETE, PATCH, OPTIONS',
              'Content-type': 'application/json',
              Authorization: `${newAccessToken.grantType} ${newAccessToken.accessToken}`,
            },
          };
          retryCounter = 0;
          return fetch(...config);
        } else {
          retryCounter = 0;
          throw new Error('Failed to reissue token');
        }
      }
      return response;
    },
  },
});
