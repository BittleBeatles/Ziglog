'use client';
import { useAppDispatch } from '@store/store';
import { useEffect } from 'react';
import { setUserInfo, setUserToken } from '@store/modules/userSlice';
import { getUserInfo } from '@api/user/user';
export default function OauthPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const oauthLogin = async () => {
      // [TOKEN]
      const urlParmas = new URLSearchParams(window.location.search);
      const accessToken = urlParmas.get('at') || '';
      const refreshToken = urlParmas.get('rt') || '';
      dispatch(
        setUserToken({ accessToken, refreshToken, grantType: 'Bearer' })
      );
      // [USERINFO]
      const result = await getUserInfo();
      if (result) {
        dispatch(setUserInfo(result));
      }
      window.location.replace('/main');
    };
    oauthLogin();
  }, []);
}
