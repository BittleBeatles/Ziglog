import TestButton from 'app/components/TestButton';

export default function Test() {
  return (
    <div className="flex-none">
      <h1 className="underline decoration-sky-500">두번째 테스트 페이지임.</h1>
      <div>
        <TestButton size="small" />
      </div>
    </div>
  );
}
