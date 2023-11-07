export interface TokenInfo {
  accessToken: string;
  grantType: string;
}

export interface UserInfo {
  nickname: string;
  profileUrl: string;
}

export interface LogoutInfo {}

export interface MyInfo {
  nickname: string;
  profileUrl: string;
  rootFolderId: number;
}

export interface NicknameInfo {
  isValid: boolean;
}
