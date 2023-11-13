import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenInfo, MyInfo } from '@api/user/types';
import { NotificationList } from '@api/notification/types';

type userSliceInfo = TokenInfo &
  MyInfo & {
    isLogin: boolean;
    theme: 'dark' | 'light';
    rootFolderId: number;
    // 알림 추가
    notifications: NotificationList;
  };

const initialState: userSliceInfo = {
  accessToken: '',
  grantType: '',
  isLogin: false,
  nickname: '',
  profileUrl: '',
  theme: 'light',
  rootFolderId: 0,
  //알림 추가
  notifications: { nontificationList: [] },
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
    // 알림 추가
    setNotifications: (state, action: PayloadAction<NotificationList>) => {
      state.notifications = action.payload;
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
  // 알림추가
  setNotifications,
} = user.actions;
export default user.reducer;
