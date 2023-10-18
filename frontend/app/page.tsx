import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="underline decoration-sky-500">지그재그 프로젝트입니다.</h1>
      <div>
        <Link href={'/main'}>메인페이지 가기</Link>
      </div>
      <div>
        <Link href={`/user-page/${encodeURIComponent('성용')}`}>
          그래프페이지가기
        </Link>
      </div>
      <div>
        <Link href={`/user-page/${encodeURIComponent('성용')}/edit-note/1`}>
          글 수정 페이지가기
        </Link>
      </div>
      <div>
        <Link href={`/user-page/${encodeURIComponent('성용')}/read-note/1`}>
          글 읽기 페이지가기
        </Link>
      </div>
    </div>
  );
}
