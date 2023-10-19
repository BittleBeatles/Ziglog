'use client';
import { useParams } from 'next/navigation';

export default function EditNote() {
  const params = useParams();
  return (
    <div>
      <h1>{params.userNickname}의</h1>
      <h1>
        한글을 그냥 이렇게 쓰면 인코딩이 안되서 이렇게 보여요! 반드시
        decodeURIComponent(params.userNickname as string) 이렇게 써야합니다
      </h1>
      <h1>{params.noteId}번째</h1>
      <h1>노트 수정페이지입니다.</h1>
    </div>
  );
}
