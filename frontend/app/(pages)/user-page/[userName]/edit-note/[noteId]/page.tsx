'use client';
import { useParams } from 'next/navigation';

export default function EditNote() {
  const params = useParams();
  return (
    <div>
      <h1>{params.userName}의</h1>
      <h1>{params.noteId}번째</h1>
      <h1>노트 수정페이지입니다.</h1>
    </div>
  );
}
