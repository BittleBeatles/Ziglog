export interface UserInfo {
  isLogin: boolean;
  accessToken: string;
  refreshToken: string;
  userId: number;
  userNickname: string;
  profileImage: string;
  theme: 'dark' | 'light';
}
