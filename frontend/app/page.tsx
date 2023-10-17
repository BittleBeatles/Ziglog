import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="underline decoration-sky-500">지그재그 프로젝트입니다.</h1>
      <div>
        <Link href={'/test'}>테스트페이지 가기</Link>
      </div>
      <div>
        <Link href={'/test2'}>두번째 테스트페이지 가기</Link>
      </div>
    </div>
  );
}
