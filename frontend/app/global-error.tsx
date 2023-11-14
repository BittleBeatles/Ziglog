'use client';
import Button from '@components/common/Button';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';
import { useRouter } from 'next/navigation';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        <SvgIcon size={120} name="Warning" />
        <Text type="h1">예상치 못한 오류가 발생했습니다</Text>
        <Button color="charcol" label="다시시도" onClick={() => reset()} />
        <Button
          color="charcol"
          label="홈페이지로 이동"
          onClick={() => {
            router.push('/');
          }}
        />
      </div>
    </div>
  );
}
