import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenInfo, MyInfo } from '@api/user/types';

type userSliceInfo = TokenInfo &
  MyInfo & {
    isLogin: boolean;
    theme: 'dark' | 'light';
    rootFolderId: number;
  };

const initialState: userSliceInfo = {
  accessToken: '',
  grantType: '',
  isLogin: false,
  nickname: '',
  profileUrl: '',
  theme: 'light',
  rootFolderId: 0,
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
    setMyInfo: (state, action: PayloadAction<MyInfo>) => {
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
      state.profileUrl = action.payload;
    },
  },
});

export const {
  logOut,
  setUserToken,
  setMyInfo,
  setMyTheme,
  setMyNickname,
  setMyProfileImage,
} = user.actions;
export default user.reducer;
