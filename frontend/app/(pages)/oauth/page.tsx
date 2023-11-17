'use client';
import { useAppDispatch } from '@store/store';
import { useEffect } from 'react';
import { setMyInfo, setUserToken } from '@store/modules/userSlice';
import { getMyInfo } from '@api/user/user';
import { subscribe } from '@api/notification/subscribe';
import { useRouter } from 'next/navigation';

export default function OauthPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const oauthLogin = async () => {
      // [TOKEN] 가져오기
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('at') || '';
      dispatch(setUserToken({ accessToken, grantType: 'Bearer' }));
      // [USERINFO] 가져오기
      const result = await getMyInfo();
      if (result) {
        dispatch(setMyInfo(result));
        // SSE 연결 설정
        subscribe((newNotification) => {
          console.log('New notification received:', newNotification);
        });
        router.push(`/user-page/${result.nickname}`);
      } else {
        window.location.replace('/');
      }
    };
    oauthLogin();
  }, [dispatch]);
}
