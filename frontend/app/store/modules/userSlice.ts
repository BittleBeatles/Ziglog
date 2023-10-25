import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenInfo, UserInfo } from '@api/user/types';

type userSliceInfo = TokenInfo &
  UserInfo & {
    theme: 'dark' | 'light';
  };

const initialState: userSliceInfo = {
  accessToken: '',
  // refreshToken: localStorage.getItem('refreshToken') || '',
  refreshToken: '',
  grantType: '',
  state: 'default',
  nickname: '',
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
    setUserToken: (state, action: PayloadAction<TokenInfo>) => {
      const payload = action.payload;
      // localStorage.setItem('refreshToken', payload.refreshToken);

      return {
        ...state,
        ...payload,
      };
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      const payload = action.payload;
      return {
        ...state,
        ...payload,
      };
    },
    setMyTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload;
    },
    setMyNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setMyProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
  },
});

export const {
  logOut,
  setUserToken,
  setUserInfo,
  setMyTheme,
  setMyNickname,
  setMyProfileImage,
} = user.actions;
export default user.reducer;
