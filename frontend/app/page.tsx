'use client';
import { getTodo } from '@api/test/fetch';
import SocialLoginButton from '@components/common/SocialLoginButton';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div>
      <SocialLoginButton name="kakao" />
      <h1 className="underline decoration-sky-500">지그재그 프로젝트입니다.</h1>
      <div>
        <Link href={'/main'}>메인페이지 가기</Link>
      </div>
      <div>
        <Link href={'/user-page/성용'}>그래프 페이지가기</Link>
      </div>
      <div>
        <Link href={'/user-page/성용}/edit-note/1'}>글 수정 페이지가기</Link>
      </div>
      <div>
        <Link href={'/user-page/성용}/read-note/1'}>글 읽기 페이지가기</Link>
      </div>
    </div>
  );
}
