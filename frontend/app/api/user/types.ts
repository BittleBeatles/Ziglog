export interface TokenInfo {
  accessToken: string;
  grantType: string;
}

export interface UserInfo {
  nickname: string;
  profileImage: string;
}

export interface LogoutInfo {}

export interface MyInfo {
  nickname: string;
  profileImage: string;
  rootFolderId: number;
}
