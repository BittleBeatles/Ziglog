'use client';
import { useParams } from 'next/navigation';

export default function ReadNote() {
  const params = useParams();
  return (
    <div>
      <h1>{params.userName}의</h1>
      <h1>{params.noteId}번째</h1>
      <h1>글 읽기 페이지입니다</h1>
    </div>
  );
}
