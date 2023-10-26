import { returnFetchJson } from './setting';
import { store } from '@store/store';

const API_URL = '';

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
    'Access-Control-Allow-Credentials': 'true',
  },
  interceptors: {
    request: async (config) => {
      const accessToken = store.getState().userReducer.accessToken;
      const grantType = store.getState().userReducer.grantType;
      config[1] = {
        headers: { Authorization: `${grantType} ${accessToken}` },
      };
      console.log(config);
      return config;
    },
  },
});
