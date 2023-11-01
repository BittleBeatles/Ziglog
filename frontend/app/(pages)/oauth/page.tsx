'use client';
import { useAppDispatch } from '@store/store';
import { useEffect } from 'react';
import { setUserInfo, setUserToken } from '@store/modules/userSlice';
import { getMyInfo } from '@api/user/user';
export default function OauthPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const oauthLogin = async () => {
      // [TOKEN] 가져오기
      const urlParmas = new URLSearchParams(window.location.search);
      const accessToken = urlParmas.get('at') || '';
      dispatch(setUserToken({ accessToken, grantType: 'Bearer' }));
      // [USERINFO] 가져오기
      const result = await getMyInfo();
      if (result) {
        dispatch(setUserInfo(result));
        window.location.replace(`/user-page/${result.nickname}`);
      } else {
        window.location.replace('/');
        console.log('[login error]');
      }
    };
    oauthLogin();
  }, [dispatch]);
}
