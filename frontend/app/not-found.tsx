'use client';
import Button from '@components/common/Button';
import SvgIcon from '@components/common/SvgIcon';
import Text from '@components/common/Text';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        <SvgIcon size={120} name="Warning" />
        <Text type="h1">페이지를 찾을 수 없습니다</Text>
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
