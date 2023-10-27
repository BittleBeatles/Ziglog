import { returnFetchJson } from './setting';
import { store } from '@store/store';
import { useDispatch } from 'react-redux';
import { reissueToken } from './user/user';
import { setAccessToken } from '@store/modules/userSlice';
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
    response: async (response, config) => {
      console.log('response', config);

      // if (response.status >= 400) {
      //   reissueToken()
      // const newAccessToken = await reissueToken('refreshToken임');
      // if (newAccessToken) {
      //   const newConfig = config;
      //   newConfig[1] = {
      //     headers: { Authorization: `Bearer ${newAccessToken}` },
      //   };
      //   return privateFetch(newConfig);
      return response;
    },
  },
});
