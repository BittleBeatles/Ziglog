import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from './type';
import { Rootstate } from '..';

const initialState = {
  isLogin: false,
  accessToken: '',
  refreshToken: localStorage.getItem('refreshToken') || '',
  userNickname: '',
  profileImage: '',
  theme: 'light',
};

export const userSlice = createSlice({
  name: 'userSlice',
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

export const {} = userSlice.actions;
export default userSlice.reducer;
