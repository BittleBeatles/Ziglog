import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from './type';

const initialState = {
  isLogin: false,
  accessToken: '',
  refreshToken: localStorage.getItem('refreshToken') || '',
  userNickname: '',
  profileImage: '',
  theme: 'light',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    setUserToken: (state, action: PayloadAction<UserInfo>) => {
      const payload = action.payload;
      localStorage.setItem('refreshToken', payload.refreshToken);

      return {
        ...state,
        isLogin: true,
      };
    },
  },
});

export const { logOut, setUserToken } = user.actions;
export default user.reducer;
