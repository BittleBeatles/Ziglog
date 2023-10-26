import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenInfo, UserInfo } from '@api/user/types';

type userSliceInfo = TokenInfo &
  UserInfo & {
    isLogin: boolean;
    theme: 'dark' | 'light';
  };

const initialState: userSliceInfo = {
  accessToken: '',
  grantType: '',
  isLogin: false,
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

      return {
        ...state,
        ...payload,
      };
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      const payload = action.payload;
      return {
        ...state,
        isLogin: true,
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
