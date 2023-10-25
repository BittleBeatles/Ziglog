export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  grantType: string;
}

export interface UserInfo {
  state: 'default' | 'guest' | 'login';
  nickname: string;
  profileImage: string;
}
