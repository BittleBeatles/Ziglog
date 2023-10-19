'use client';
import { useParams } from 'next/navigation';

export default function UserPage() {
  const params = useParams();
  return (
    <div>
      <h1>
        {decodeURIComponent(params.userNickname as string)}의 개인페이지입니다.
      </h1>
    </div>
  );
}
